import { Router } from "express";
import { createUser, getAllUser, logInUser } from "../controllers/user.controller.js";

const router =  Router();


router.route("/").post(createUser);
router.route("/").get(getAllUser)
router.route("/login").post(logInUser);

export default  router;


