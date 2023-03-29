import User from "../model/Users.js";
import asyncHandler from "express-async-handler";

import { generateToken } from "../config/jwtToken.js";

export const login = asyncHandler(async (req, res) => {
  const { googleId } = req.body;

  const findUser = await User.findOne({ googleId });

  if (!findUser) {
    const newUser = await User.create(req.body);

    res
      .cookie("token", generateToken(newUser?._id), {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        _id: newUser?._id,
        googleId: newUser?.googleId,
        userName: newUser?.userName,
        image: newUser?.image,
      });
  } else {
    // const refreshToken = generateRefreshToken(findUser?.googleId);

    // const updateUser = await User.findOneAndUpdate(
    //   findUser.googleId,
    //   {
    //     refreshToken: refreshToken,
    //   },
    //   { new: true }
    // );

    res
      .cookie("token", generateToken(findUser?._id), {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        _id: findUser?._id,
        googleId: findUser?.googleId,
        userName: findUser?.userName,
        image: findUser?.image,
        token: generateToken(findUser?._id),
      });
  }
});

export const getUser = asyncHandler(async (req, res) => {
  const { googleId } = req.params;

  const findUser = await User.findOne({ googleId });

  if (findUser) {
    res.status(200).json({
      _id: findUser?._id,
      googleId: findUser?.googleId,
      userName: findUser?.userName,
      image: findUser?.image,
    });
  } else {
    throw new Error("Not Found");
  }
});

// export const handleRefreshToken = asyncHandler(async (req, res) => {
//   const cookie = req.cookies;
//   if (!cookie?.refreshToken) {
//     throw new Error("No Refresh Token in Cookies");
//   }
//   const refreshToken = cookie.refreshToken;
//   const user = await User.findOne({ refreshToken });
//   if (!user) throw new Error("No Refresh token present in db or not matched");
//   jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
//     if (err || user._id !== decoded.id) {
//       throw new Error("There is something wrong with refresh token");
//     }
//     const accessToken = generateToken(user._id);
//     res.json({ accessToken });
//   });
// });

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
  });
  return res.sendStatus(204);
});
