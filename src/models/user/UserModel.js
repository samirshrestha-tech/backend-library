import UserSchema from "./UserSchema.js";

// create

export const createUser = (userObj) => {
  return UserSchema(userObj).save();
};

// read

// update

// delete
