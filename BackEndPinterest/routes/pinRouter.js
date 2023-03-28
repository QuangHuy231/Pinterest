import express from "express";
import { createPin, getAllPins } from "../controller/pin.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-pin", createPin);
router.get("/all-pins", getAllPins);

export default router;
