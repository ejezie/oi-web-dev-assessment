import express from "express";
// import app from "./app.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'
import errorMiddleWare from "./middlewares/error.js";
import bodyParser from "body-parser";
import cloudinary from 'cloudinary'
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

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200, 
};

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions))

// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
