import { getSession } from "../models/session/SessionModel.js";
import { getUserByEmail } from "../models/user/UserModel.js";
import { accessJwtDecode } from "../utils/jwtHelper.js";

export const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    // validate if accessJwt is valid

    const decoded = accessJwtDecode(authorization);

    if (decoded?.email) {
      // check if it exists in session table

      const tokenExist = await getSession({ token: authorization });

      if (tokenExist?._id) {
        // extract the email from the token and get user detail
        const user = await getUserByEmail(decoded.email);
        if (user?._id) {
          // if everything is true then set the userinfo in req.body and send it to next to process the further
          user.password = undefined;
          req.userInfo = user;
          return next();
        }
      }
    }

    throw new Error("Invalid token, Unauthorized");
  } catch (error) {
    error.errorCode = 401;
    if (error.message.includes("jwt expired")) {
      error.errorCode = 403;
    }
    console.log(error);
    next(error);
  }
};
