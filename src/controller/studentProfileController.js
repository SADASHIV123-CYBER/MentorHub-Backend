import { StatusCodes } from 'http-status-codes';
import {createStudentProfileService, getMyStudentProfileService, updateStudentProfileService} from '../service/studentProfileService.js'
import { errorResponce, successResponce } from '../utils/responses.js';

export const createStudentProfileController = async (req, res) => {
    try {
        const profile = await createStudentProfileService(req.user._id, req.body);

        return successResponce(
            res, profile,
            StatusCodes.CREATED,
            "Student profile created"
        );
    } catch (error) {
        return errorResponce(res, error)
    }


}


export const getMyStudentProfileController = async(req, res) => {
    try {
        const profile = await getMyStudentProfileService(req.user._id);

        return successResponce(
            res,
            profile, 
            StatusCodes.OK,
            "student profile fetched"
        )
    } catch (error) {
        errorResponce(res, error)
    }
}

export const updateStudentProfileController = async (req, res) => {
    try {
        const profile = await updateStudentProfileService(req.user._id, req.body);

        return successResponce(res, profile, StatusCodes.OK, "Student profile updated")
    } catch (error) {
        return errorResponce(res, error)
    }
}