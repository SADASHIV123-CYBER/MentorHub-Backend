import { StatusCodes } from "http-status-codes";
import {
  getStudentProfileByUserIdRepo,
  updateStudentProfileRepo,
  createStudentProfileRepo
} from "../repository/studentProfileRepo.js";

import AppError from "../utils/errors/appError.js";
import { withErrorHandling } from "../utils/errors/errorHandler.js";

export const createStudentProfileService = withErrorHandling(
  async (userId, body) => {

    const existing = await getStudentProfileByUserIdRepo(userId);

    if (existing) {
      throw new AppError(
        "Student profile already exists",
        StatusCodes.BAD_REQUEST
      );
    }

    const {
      headline,
      bio,
      learningGoals,
      preferredTechStack,
      skillLevel,
      interests
    } = body;

    return createStudentProfileRepo({
      userId,
      headline,
      bio,
      learningGoals,
      preferredTechStack,
      skillLevel,
      interests
    });
  }
);

export const getMyStudentProfileService = withErrorHandling(async (userId) => {

  const profile = await getStudentProfileByUserIdRepo(userId);

  if (!profile) {
    throw new AppError(
      "Student profile not found",
      StatusCodes.NOT_FOUND
    );
  }

  return profile;

});

export const updateStudentProfileService = withErrorHandling(
  async (userId, data) => {

    const update = await updateStudentProfileRepo(userId, data);

    if (!update) {
      throw new AppError(
        "Student profile not found",
        StatusCodes.NOT_FOUND
      );
    }

    return update;
  }
);