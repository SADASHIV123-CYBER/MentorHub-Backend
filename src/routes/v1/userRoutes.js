import express from "express";
import { createUserController, resendOtpController, verifyOtpController } from "../../controller/userController.js";
import cloudinaryUploader from "../../middlewares/multerUploader.js"

const userRouter = express.Router();

userRouter.post("/register", 
    cloudinaryUploader("profile").single("profilePicture"),
    createUserController);
userRouter.post("/verify-otp", verifyOtpController);
userRouter.post("/resend-otp", resendOtpController);

export default userRouter;
