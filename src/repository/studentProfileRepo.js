import { StudentProfile } from "../schema/studentProfile.js";
import { withErrorHandling } from "../utils/errors/errorHandler.js";

export const createStudentProfileRepo = (data) => {
  return StudentProfile.create(data);
};

export const getStudentProfileByUserIdRepo = withErrorHandling( (userId) => {
  return StudentProfile.findOne({ userId }).populate(
    "userId",
    "fullName profilePicture"
  );
});

export const getAllPublicStudentsRepo = withErrorHandling( () => {
  return StudentProfile.find({ isPublic: true }).populate(
    "userId",
    "fullName profilePicture"
  );
});

export const updateStudentProfileRepo = withErrorHandling( (userId, data) => {
  return StudentProfile.findOneAndUpdate({ userId }, data, {
    new: true,
  }).populate("userId", "fullName profilePicture");
});
