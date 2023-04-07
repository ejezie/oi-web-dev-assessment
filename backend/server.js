import app from "./app.js";
import dotenv from "dotenv";
import errorMiddleWare from "./middlewares/error.js";
import { dbConnect } from "./config/dbConnect.js";

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

// Error handling middleware
app.use(errorMiddleWare);

app.listen(process.env.PORT, () => {
  console.log(
    `App listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
