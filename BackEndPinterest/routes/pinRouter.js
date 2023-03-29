import express from "express";
import {
  addComment,
  createPin,
  deletePin,
  getAllPins,
  getDetailPin,
  getMorePin,
  getPinOFCategory,
  getPinOfUser,
  getPinUserSave,
  savePin,
  searchPin,
  unSavePin,
} from "../controller/pin.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-pin", authMiddleware, createPin);
router.get("/all-pins", authMiddleware, getAllPins);
router.get("/:category", authMiddleware, getPinOFCategory);
router.get("/getPin/:id", authMiddleware, getDetailPin);
router.post("/getMorePin/:id", authMiddleware, getMorePin);
router.post("/searchPin", authMiddleware, searchPin);
router.delete("/delete-pin/:id", authMiddleware, deletePin);
router.put("/save-pin/:id", authMiddleware, savePin);
router.put("/commentPin/:id", authMiddleware, addComment);
router.put("/unsave-pin/:id", authMiddleware, unSavePin);
router.get("/getPinOfUser/:id", authMiddleware, getPinOfUser);
router.get("/getPinUserSave/:id", authMiddleware, getPinUserSave);
export default router;
