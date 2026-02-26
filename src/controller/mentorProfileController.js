import {
  createMentorProfileService,
  getMyMentorProfileService,
  getAllPublicMentorsService,
  updateMentorProfileService,
} from "../service/mentorProfileService.js";
import { StatusCodes } from "http-status-codes";
import {successResponce, errorResponce} from "../utils/responses.js"

export const createMentorProfileController = async (req, res) => {
  try {
    const profile = await createMentorProfileService(req.user._id, req.body);

    return successResponce(
      res,
      profile,
      StatusCodes.CREATED,
      "Mentor profile created"
    );
  } catch (error) {
    return errorResponce(res, error);
  }
};

export const getMyMentorProfileController = async (req, res) => {
  try {
    const profile = await getMyMentorProfileService(req.user._id);

    return successResponce(
      res,
      profile,
      StatusCodes.OK,
      "Mentor profile fetched"
    );
  } catch (error) {
    return errorResponce(res, error);
  }
};

export const getAllPublicMentorsController = async (req, res) => {
  try {
    const mentors = await getAllPublicMentorsService();

    return successResponce(
      res,
      mentors,
      StatusCodes.OK,
      "Public mentors fetched"
    );
  } catch (error) {
    return errorResponce(res, error);
  }
};

export const updateMentorProfileController = async (req, res) => {
  try {
    const profile = await updateMentorProfileService(
      req.user._id,
      req.body
    );

    return successResponce(
      res,
      profile,
      StatusCodes.OK,
      "Mentor profile updated"
    );
  } catch (error) {
    return errorResponce(res, error);
  }
};
