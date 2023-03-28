import express from "express";

const app = express();

import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import pinRouter from "./routes/pinRouter.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(dirname(__filename) + "/uploads"));

mongoose.set("strictQuery", true);

await mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Sucessfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/auth", authRouter);
app.use("/pin", pinRouter);

const photoMiddleware = multer({
  dest: "uploads",
});

app.post("/upload", photoMiddleware.single("photo"), (req, res) => {
  const { path, originalname } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;

  fs.renameSync(path, newPath);

  const uploadFile = newPath.replace("uploads\\", "");

  res.json(uploadFile);
});
app.get("/download/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "uploads", filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  const fileStream = fs.createReadStream(filePath);
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  fileStream.pipe(res);
});

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("server start");
});
