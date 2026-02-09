import jwt from "jsonwebtoken";
import serverConfig from '../config/serverConfig.js';
import UnauthorisedError from "../utils/errors/unauthorisedError.js";
import InternalServerError from "../utils/errors/internalServerError.js";
// import { User } from "../schema/userSchema.js";
import User from "../schema/userSchema.js"
import { errorResponce } from "../utils/responses.js";


// export async function isLoggedIn(req, res, next) {
//     // Try to get token from cookie first
//     let token = req.cookies?.authToken;

//     if (!token && req.headers.authorization?.startsWith("Bearer ")) {
//         token = req.headers.authorization.split(" ")[1];
//     }

//     if (!token) {
//         return errorResponce(res, new UnauthorisedError("No Auth Token provided"));
//     }

//     try {
//         const decode = jwt.verify(token, serverConfig.JWT_SECRET);

//         const user = await User.findOne({ email: decode.email });
//         if (!user) {
//             throw new UnauthorisedError("User not found");
//         }

//         req.user = user;

//         next();
//     } catch (error) {

//         if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
//             return errorResponce(res, new UnauthorisedError("Invalid or expired token"));
//         }
//         return errorResponce(res, new InternalServerError());
//     }
// }


export async function isLoggedIn(req, res, next) {
  let token = req.cookies?.authToken;

  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return errorResponce(
      res,
      new UnauthorisedError("No Auth Token provided")
    );
  }

  try {
    const decode = jwt.verify(token, serverConfig.JWT_SECRET);

    const user = await User.findOne({ email: decode.email });
    if (!user) {
      return errorResponce(
        res,
        new UnauthorisedError("User not found")
      );
    }

    req.user = user;
    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return errorResponce(
        res,
        new UnauthorisedError("Invalid or expired token")
      );
    }

    return errorResponce(res, new InternalServerError());
  }
}

