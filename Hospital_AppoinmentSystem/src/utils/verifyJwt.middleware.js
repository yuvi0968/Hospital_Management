import { User } from "../model/user.model.js";
import ApiError from "./ApiError.js";
import jwt from "jsonwebtoken";


export const verifyJwt = (async (req, _, next) => {
    try {

        const accessToken = req?.cookies?.accessToken || req?.header("Authorization")?.replace("Bearer ", "");

        if (!accessToken) {
            throw new ApiError(401, "Unauthorized request")
        };

        const decodedToken = jwt.verify(accessToken, process.env.AccessTokenSecret);

        const user = await User.findById(decodedToken?._id).select("-password");

        if (!user) {
            throw new ApiError(400, "Invalid acccess token")
        };
        console.log("User is : ", user);
        req.user = user;

        next();
    } catch (error) {
        throw new ApiError(400, error.message || "Invalid access token.")
    }

});