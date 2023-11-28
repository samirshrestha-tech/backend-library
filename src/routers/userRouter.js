import express from "express";
import { createUser } from "../models/user/UserModel.js";
import { hashPassword } from "../utils/bcrypt.js";
import { newUserValidation } from "../middlewares/joiValidation.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    res.json({
      status: "successs",
      message: "to do get user",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", (req, res, next) => {
  try {
    res.json({
      status: "successs",
      message: "to do post user",
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
          status: "successs",
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
