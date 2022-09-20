import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./db/connect";
import notFound from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
require("express-async-errors");
import authRouter from "./routes/authRoute";
import jobsRouter from "./routes/authRoute";

const app = express();

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
app.use("/api/v1/jobs", jobsRouter);

// error-handler
app.use(notFound);
app.use(errorHandlerMiddleware);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running in ${PORT} `);
});
