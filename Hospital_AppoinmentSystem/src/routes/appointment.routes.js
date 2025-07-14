import { Router } from "express";
import { bookAppointment, getAllAppointments, cancelAppointment } from "../controllers/appointment.controller.js";
import { verifyJwt } from "../utils/verifyJwt.middleware.js";

const router =  Router();

router.use(verifyJwt);

router.route("/").post(bookAppointment);
router.route("/").get(getAllAppointments);
router.route("/cancel/:appointmentId").post(cancelAppointment);

export default router;
