import {
  createMentorProfileRepo,
  getMentorProfileByUserIdRepo,
  getAllPublicMentorsRepo,
  updateMentorProfileRepo,
} from "../repository/mentorProfileRepo.js";
import { StatusCodes } from "http-status-codes";
import AppError from "../utils/errors/appError.js"
import { withErrorHandling } from "../utils/errors/errorHandler.js";

// export const createMentorProfileService = withErrorHandling( async (userId, body) => {
//   const existing = await getMentorProfileByUserIdRepo(userId);

//   if (existing) {
//     throw new AppError("Mentor profile already exists", StatusCodes.BAD_REQUEST);
//   }

//   return createMentorProfileRepo({ userId, body });
// });


export const createMentorProfileService = withErrorHandling(
  async (userId, body) => {
    const existing = await getMentorProfileByUserIdRepo(userId);

    if (existing) {
      throw new AppError(
        "Mentor profile already exists",
        StatusCodes.BAD_REQUEST
      );
    }

    const { headline, bio, skills, experience, pricePerSession } = body;

    return createMentorProfileRepo({
      userId,
      headline,
      bio,
      skills,
      experience,
      pricePerSession,
    });
  }
);

export const getMyMentorProfileService = withErrorHandling( async (userId) => {
  const profile = await getMentorProfileByUserIdRepo(userId);

  if (!profile) {
    throw new AppError("Mentor profile not found", StatusCodes.NOT_FOUND);
  }

  return profile;
});

export const getAllPublicMentorsService =withErrorHandling( async () => {
  return getAllPublicMentorsRepo();
});

export const updateMentorProfileService = withErrorHandling( async (userId, data) => {
  const updated = await updateMentorProfileRepo(userId, data);

  if (!updated) {
    throw new AppError("Mentor profile not found", StatusCodes.NOT_FOUND);
  }

  return updated;
});
