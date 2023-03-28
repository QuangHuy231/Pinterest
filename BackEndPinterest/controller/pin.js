import asyncHandler from "express-async-handler";
import Pin from "../model/Pin.js";

export const createPin = asyncHandler(async (req, res) => {
  const { title, about, destinantion, image, postedBy, category } = req.body;

  try {
    const pinDoc = await Pin.create({
      title,
      about,
      destinantion,
      image,
      postedBy: postedBy,
      category,
    });
    res.json(pinDoc);
  } catch (error) {
    throw new Error(error);
  }
});

export const getAllPins = asyncHandler(async (req, res) => {
  try {
    const allPins = await Pin.find().populate("postedBy");
    res.json(allPins);
  } catch (error) {
    throw new Error(error);
  }
});
