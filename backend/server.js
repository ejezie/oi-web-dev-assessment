import app from "./app.js";
import dotenv from "dotenv";

// Set up env configuration
dotenv.config({
    path: "backend/config/config.env",
})

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})