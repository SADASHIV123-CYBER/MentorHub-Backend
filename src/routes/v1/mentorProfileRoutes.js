import express from "express";
import {
  createMentorProfileController,
  getMyMentorProfileController,
  getAllPublicMentorsController,
  updateMentorProfileController,
} from "../../controller/mentorProfileController.js";
import { isLoggedIn, isMentor } from "../../middlewares/authMiddleware.js";

const mentorRouter = express.Router();

mentorRouter.post("/create", isLoggedIn, isMentor, createMentorProfileController);

mentorRouter.get("/me", isLoggedIn, isMentor, getMyMentorProfileController);

mentorRouter.patch("/update", isLoggedIn, isMentor, updateMentorProfileController);

mentorRouter.get("/public", getAllPublicMentorsController);

export default mentorRouter;
