import express from "express";
import userRouter from "./userRoutes.js";
import authRouter from "./auth.js";
import passwordRouter from "./passwordRoutes.js"
import verifyRouter from "./verify.js";
import adminRouter from "./adminRoutes.js";

const router = express.Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/reset', passwordRouter);
router.use('/verify', verifyRouter);
router.use('/admin', adminRouter)

export default router