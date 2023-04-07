import express from "express";
// import app from "./app.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import errorMiddleWare from "./middlewares/error.js";
import { dbConnect } from "./config/dbConnect.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

// Set up env configuration
dotenv.config({
  path: "backend/config/config.env",
});

dbConnect(process.env.MONGO);

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("shutting down due to uncaughtException");
  process.exit(1);
});

// Handle promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("shutting down server due to unhandledRejection");
  server.close(() => {
    process.exit(1);
  });
});

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || "DEVELOPMENT";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/", userRoutes);
app.use("/api/v1/", postRoutes);
app.use("/api/v1/", commentRoutes);

// Error handling middleware
app.use(errorMiddleWare);

app.listen(PORT, () => {
  console.log(
    `App listening on port ${process.env.PORT} in ${ENV} mode.`
  );
});
