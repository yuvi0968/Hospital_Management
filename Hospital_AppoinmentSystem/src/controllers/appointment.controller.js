import { Appointment } from "../model/appoinment.model.js";
import ApiError from "../utils/ApiError.js";


const bookAppointment = (async (req, res) => {
    try {
        const { patientName, age, doctorName } = req.body;

        if (!(patientName && age)) {
            throw new Error(400, "Patient Name or age is must");
        };

        //Reduce duplication 
        const appointment = await Appointment.findOne({
            $and: [
                { user: req?.user?._id },
                { patientName: patientName }
            ]
        });

        if (appointment) {
            throw new ApiError(400,  "Apointment is already booked.")
        };

        const newAppointment = await Appointment.create({
            patientName,
            age,
            doctorName: doctorName || "",
            patientId: user?.req?._id
        });

        res.status(200)
            .json({
                data: newAppointment,
                message: "Appointment booked successfully.",
                success: true
            });

    } catch (error) {
        throw new ApiError(500, error.message || "Server Error")
    }
});

const getAllAppointments = (async (req, res) => {
    try {
        const appointments = await Appointment.find({});

        return res.status(200)
            .json({
                data: appointments,
                message: "All patient appointment fetched successfully.",
                success: true
            });
    } catch (error) {
        throw new ApiError(500, error.message || "Server Error")
    }
});

const cancelAppointment = (async (req, res) => {
    try {
        const { appointmentId } = req.params;

        const appointment = await Appointment.findById(appointmentId);

        console.log("Appointment details  : ", appointment);

        if (!appointment) {
            throw new ApiError(404, "Appointment not found !!")
        };

        const removeAppointment = await Appointment.findByIdAndDelete(appointmentId);

        return res.status(200)
            .json({
                message: "Appointement canceled succussfully."
            })

    } catch (error) {
        throw new ApiError(500, error.message || "Server Error")
    }
});

export { bookAppointment, getAllAppointments, cancelAppointment }