import { User } from "../model/user.model.js";
import ApiError from "../utils/ApiError.js";



const createUser = (async (req, res) => {
   try {
     const {userName, password} = req?.body;
 
     console.log(userName, password)
 
     if (!(userName && password)) {
         throw new ApiError(400, "User name and password is must !!")
     };
 
     const user = await User.findOne({userName: userName});
 
     if (user) {
         throw new ApiError(400, "User is already available.")
     };
 
     const newUser = await User.create({
         userName,
         password
     });
 
     const validateUser = await User.findById(newUser?._id).select("-password");
 
     if (!validateUser) {
         throw new ApiError(500, "User is not register !!")
     };
 
     return res.status(201)
     .json({
         data:validateUser,
         message:"User has been register successfully.",
         success:true
     });
   } catch (error) {
    throw new ApiError(500, error.message || "Server Error")
   }
});

const logInUser = ( async (req, res) => {
   try {
     const {userName, password } = req.body;
 
     if (!(userName && password)) {
         throw new ApiError(400, "User name and password is must !!")
     };
 
     const user = await User.findOne({userName: userName});
 
     if (!user){
         throw new ApiError(401, "Invalid user credentials.")
     };
 
     const isPassword = await user.passwordCorrect(password);
     if (!isPassword) {
         throw new ApiError(400, "Invalid User Password.")
     };
 
     const accessToken = user.generateAccessToken();
 
     const options = {
         httpOnly: true,
         secure: true
     };
 
     return res.status(200)
     .cookie("accessToken", accessToken, options)
     .json({
      message:"User has been loggedIn Successfully.",
      success: true   
     });
 
   } catch (error) {
        throw new ApiError(500, error.message || "Server Error")
   }
});

const getAllUser = (async (req, res) =>{
    try {
        const users = await User.find({}).select("-password");
    
        return res.status(200)
        .json({
            data:users,
            message: "User has been fetched successfully.",
            success:true
        });
    
    } catch (error) {
            throw new ApiError(500, error.message|| "Server Error")
    }
});

export {createUser, logInUser, getAllUser}