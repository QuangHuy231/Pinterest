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
// import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-pin", createPin);
router.get("/all-pins", getAllPins);
router.get("/:category", getPinOFCategory);
router.get("/getPin/:id", getDetailPin);
router.post("/getMorePin/:id", getMorePin);
router.post("/searchPin", searchPin);
router.delete("/delete-pin/:id", deletePin);
router.put("/save-pin/:id", savePin);
router.put("/commentPin/:id", addComment);
router.put("/unsave-pin/:id", unSavePin);
router.get("/getPinOfUser/:id", getPinOfUser);
router.get("/getPinUserSave/:id", getPinUserSave);
export default router;
