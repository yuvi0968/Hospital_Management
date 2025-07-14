import mongoose, { Schema } from "mongoose";

const appointmentSchema = new Schema(
    {
        patientId: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        patientName: {
            type: String,
            trim: true,
            required: true,
            lowercase: true
        },
        age:{
            type:Number,
            required:true
        },
        doctorName: {
            type: String,
            default: ""
        }
    },
    { timestamps: true });

export const Appointment = mongoose.model("Appointment", appointmentSchema);
