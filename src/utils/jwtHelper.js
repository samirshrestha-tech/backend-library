import jwt from "jsonwebtoken";

// access token for sign in token, exp : 15min

export const signJwtToken = (obj) => {
  return jwt.sign(obj, process.env.ACCESS_SECRET_KEY, { expiresIn: "15m" });
};

// refresh token,user table, exp : 30days

export const signRefreshJwtToken = (obj) => {
  return jwt.sign(obj, process.env.REFRESH_SECRET_KEY, { expiresIn: "30d" });
};

export const signJwts = (obj) => {
  return {
    accessJwt: signJwtToken(obj),
    refreshJwt: signRefreshJwtToken(obj),
  };
};
