import express from "express"
import { isLoggedIn } from "../../middlewares/authMiddleware.js";
import { createStudentProfileController, getMyStudentProfileController, updateStudentProfileController } from "../../controller/studentProfileController.js";

const studentRouter = express.Router();

studentRouter.post("/create", isLoggedIn, createStudentProfileController);

studentRouter.get("/me", isLoggedIn, getMyStudentProfileController);

studentRouter.patch("/update", isLoggedIn, updateStudentProfileController);

export default studentRouter