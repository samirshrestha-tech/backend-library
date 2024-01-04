import sessionSchema from "./SessionSchema.js";

// create session token

export const createSession = (obj) => {
  return sessionSchema(obj).save();
};

// read and update session token
export const readSessionToken = (email, token) => {
  return sessionSchema.findOne(email, { token });
};
// filter must be an object
export const getSession = (filter) => {
  return sessionSchema.findOne(filter);
};
