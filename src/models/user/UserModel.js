import UserSchema from "./UserSchema.js";

// create

export const createUser = (userObj) => {
  return UserSchema(userObj).save();
};

// read by email

export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};

// update

// delete

// create refreshToken and save in user table

export const refreshToken = async (email, refreshToken) => {
  return await UserSchema.findOneAndUpdate({ email }, { refreshToken });
};
