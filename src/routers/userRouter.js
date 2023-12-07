import express from "express";
import { createUser, getUserByEmail } from "../models/user/UserModel.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import {
  loginValidation,
  newUserValidation,
} from "../middlewares/joiValidation.js";
import { signJwtToken, signJwts } from "../utils/jwtHelper.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "to do get user",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "to do post user",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", loginValidation, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // get user by email

    const user = await getUserByEmail(email);

    // check if the user exist in db bychecking the id and if exist then check the password from db and the plaintext matches

    if (user?._id) {
      // ismatched variable is gonna give truthy or falsy value

      const isMatched = comparePassword(password, user.password);
      if (isMatched) {
        // jwts

        const jwts = signJwts({ email: user.email });
        return res.json({
          status: "success",
          message: "to do post user",
          jwts,
        });
      }
    }
    res.json({
      status: "error",
      message: "Invalid login detials",
    });
  } catch (error) {
    next(error);
  }
});
// this router should be private

router.post("/admin-user", newUserValidation, async (req, res, next) => {
  try {
    const { password } = req.body;

    //    hash password

    req.body.password = hashPassword(password);

    req.body.role = "admin";

    const user = await createUser(req.body);
    console.log(user);

    user?._id
      ? res.json({
          status: "success",
          message: " created admin user",
        })
      : res.json({
          status: "error",
          message: "couldnot  create admin user",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "There is already an user with this email id";
      error.errorCode = 200;
    }
    next(error);
  }
});

export default router;
