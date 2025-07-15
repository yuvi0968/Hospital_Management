import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        userName:{
            type:String,
            unique:true,
            required:true,
            lowercase:true,
            trim:true
        },
        password:{
            type:String,
            required:[true, "Password is must!!"]
        },
        role:{
            type:String,
            enum:["patient", "doctor"],
            default:"patient"
        }
    },
    {timestamps:true});

    userSchema.pre("save", async function(next) {
        if (!this.isModified("password")) return next();
        
        this.password = await bcrypt.hash(this.password, 10);
        next();
    });

    userSchema.methods.passwordCorrect = async function (password) {
        return await bcrypt.compare(password, this.password);
    };

    userSchema.methods.generateAccessToken = function() {
        return jwt.sign(
        {
            id:this._id,
            userName:this.userName
        }, 
        process.env.AccessTokenSecret,
        {expiresIn:process.env.AccessTokenExpire}
    )};

export const User = mongoose.model("User", userSchema);

