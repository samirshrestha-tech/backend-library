import jwt from "jsonwebtoken";
import { createSession } from "../models/session/SessionModel.js";
import { refreshToken } from "../models/user/UserModel.js";

// access token for sign in token, exp : 15min

export const signJwtToken = (obj) => {
  const token = jwt.sign(obj, process.env.ACCESS_SECRET_KEY, {
    expiresIn: "15m",
  });
  createSession({ token });

  return token;
};

export const accessJwtDecode = (accessJwt) => {
  return jwt.verify(accessJwt, process.env.ACCESS_SECRET_KEY);
};

// refresh token,user table, exp : 30days

export const signRefreshJwtToken = (email) => {
  const token = jwt.sign({ email }, process.env.REFRESH_SECRET_KEY, {
    expiresIn: "30d",
  });
  refreshToken(email, token);

  return token;
};

export const signJwts = (email) => {
  return {
    accessJwt: signJwtToken({ email }),
    refreshJwt: signRefreshJwtToken(email),
  };
};
