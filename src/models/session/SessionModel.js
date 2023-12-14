import sessionSchema from "./SessionSchema.js";

// create session token

export const createSession = (obj) => {
  return sessionSchema(obj).save();
};

// read and update session token
export const readSessionToken = (email, token) => {
  return sessionSchema.findOne(email, { token });
};
