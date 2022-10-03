import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./db/connect";
import notFound from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
require("express-async-errors");
import authRouter from "./routes/authRoute";
import jobsRouter from "./routes/jobRoute";
import { authenticationMiddleware } from "./middleware/auth";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
var xss = require("xss-clean");
const app = express();

//extra security packages
app.use(cors());
//load env config
dotenv.config({ path: "./config/config.env" });

//mongo config
connectDB();

//body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// middleware

//Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticationMiddleware, jobsRouter);

// error-handler
app.use(notFound);
app.use(errorHandlerMiddleware);

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  })
);
app.use(helmet());

app.use(xss());
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running in ${PORT} `);
});
