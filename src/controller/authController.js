// src/controllers/authController.js
import { StatusCodes } from "http-status-codes";
import serverConfig from "../config/serverConfig.js";
import { loginUser } from "../service/authService.js";
import { errorResponce, successResponce } from "../utils/responses.js";
import logger from "../utils/logger.js";
import { authTokenService } from "../service/authTokenService.js";
import { verifyRefreshToken } from "../utils/tokenUtil.js";


export async function login(req, res) {
  try {
    const loginPayload = req.body;
    console.log('user body', loginPayload);
    
    const token = await loginUser(loginPayload);
    const isProd = serverConfig.NODE_ENV;



    const cookieOptions = {
      httpOnly: true,
      secure: isProd,              
      sameSite: isProd ? 'None' : 'Lax', 
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    };



    if (process.env.COOKIE_DOMAIN && process.env.COOKIE_DOMAIN !== 'localhost') {
      cookieOptions.domain = process.env.COOKIE_DOMAIN;
    }

    logger.info('Setting auth cookie with options:', cookieOptions);

    res.cookie('authToken', token, cookieOptions);

    return successResponce(res, null, StatusCodes.OK, `User logged in successfully: ${loginPayload.email}`);
  } catch (error) {
    logger.error(error);
    return errorResponce(res, error);
  }
}


// export const logout = async (req, res) => {
//   try {
//     const { id: userId, jti } = req.user;

//     // revoke refresh token in DB
//     await authTokenService.logout(userId, jti);

//     // clear refresh token cookie
//     res.clearCookie("refreshToken", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "None",
//       path: "/"
//     });

//     return successResponce(
//       res,
//       null,
//       StatusCodes.OK,
//       "Logged out successfully"
//     );
//   } catch (error) {
//     return errorResponce(res, error);
//   }
// };


export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return successResponce(res, null, 200, "Already logged out");
    }

    const payload = verifyRefreshToken(refreshToken);
    const { id: userId, jti } = payload;

    await authTokenService.logout(userId, jti);

    res.clearCookie("authToken", {
      httpOnly: true,
      secure: serverConfig.NODE_ENV,
      sameSite: "None",
      path: "/"
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: serverConfig.NODE_ENV,
      sameSite: "None",
      path: "/"
    });

    return successResponce(res, null, 200, "Logged out successfully");
  } catch (error) {
    return errorResponce(res, error);
  }
};



