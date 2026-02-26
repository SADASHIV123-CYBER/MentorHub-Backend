import { MentorProfile } from "../schema/mentorProfile.js";
import { withErrorHandling } from "../utils/errors/errorHandler.js";

export const createMentorProfileRepo = (data) => {
  return MentorProfile.create(data);
};

export const getMentorProfileByUserIdRepo = withErrorHandling( (userId) => {
  return MentorProfile.findOne({ userId }).populate(
    "userId",
    "fullName profilePicture"
  );
});

export const getAllPublicMentorsRepo = withErrorHandling( () => {
  return MentorProfile.find({ isPublic: true }).populate(
    "userId",
    "fullName profilePicture"
  );
});

export const updateMentorProfileRepo = withErrorHandling( (userId, data) => {
  return MentorProfile.findOneAndUpdate({ userId }, data, {
    new: true,
  }).populate("userId", "fullName profilePicture");
});
