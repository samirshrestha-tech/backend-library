import "dotenv/config";
import cors from "cors";

import express from "express";
import morgan from "morgan";

const app = express();

const PORT = process.env.PORT || 8000;
// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "server is running",
  });
});

app.use("*", (req, res, next) => {
  const error = {
    message: "404 not found",
    errorCode: 404,
  };
  next(error);
});

// error handling

app.use((error, req, res, next) => {
  const errorCode = error.errorCode || 500;

  res.status(errorCode).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log("your server is running at http://localhost:" + PORT);
});
