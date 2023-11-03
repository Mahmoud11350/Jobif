import * as dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import demoUserMiddleware from "./middleware/demoUserMiddleware.js";

cloudinary.config({
  cloud_name: "fullstack-mern-developer",
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const app = express();
import { connect } from "mongoose";

// routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";
import notFound from "./middleware/notFoundError.js";
import errorHandler from "./middleware/errorHandler.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";

// pre middlewares
if (process.env.NODE_ENV === "DEVELOPMENT") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
// app.use(cors({ credentials: true, origin: true }));
// app.use(helmet());

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", [authMiddleware], userRoutes);
app.use("/api/v1/jobs", [authMiddleware], jobsRoutes);

// post middleware
app.use(notFound);
app.use(errorHandler);
const start = async () => {
  try {
    await connect(process.env.MONGOCLUSTER);
    app.listen(
      process.env.PORT,
      console.log(`server is running on port ${process.env.PORT}`)
    );
  } catch (error) {}
};

start();
