import express from "express";
const app = express();
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import connectDB from "./config/database.js";
import cloudinary from "cloudinary";
import Image from "./Routes/ImageRoutes.js";
import User from "./Routes/UserRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/", Image);
app.use("/", User);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
