import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../model/Users.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded?.id);
      req.user = user;
      next();
    }
  } catch (error) {
    throw new Error("Not Authorized token expired, please Login again");
  }
});
