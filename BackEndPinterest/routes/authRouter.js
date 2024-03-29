import express from "express";
import {
  getUser,
  // handleRefreshToken,
  login,
  logout,
} from "../controller/auth.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.get("/get-user/:googleId", authMiddleware, getUser);
// router.put("/refresh", handleRefreshToken);

export default router;
