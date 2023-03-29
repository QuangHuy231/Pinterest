import asyncHandler from "express-async-handler";
import Pin from "../model/Pin.js";

export const createPin = asyncHandler(async (req, res) => {
  const { title, about, destinantion, image, userId, postedBy, category } =
    req.body;

  try {
    const pinDoc = await Pin.create({
      title,
      about,
      destinantion,
      image,
      userId,
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
    const allPins = await Pin.find()
      .populate("postedBy")
      .populate("save.userSave");
    res.json(allPins);
  } catch (error) {
    throw new Error(error);
  }
});

export const getPinOFCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  try {
    const pinOfCategory = await Pin.find({ category })
      .populate("postedBy")
      .populate("save.userSave");
    if (pinOfCategory) {
      res.json(pinOfCategory);
    } else {
      throw new Error("Category emty!");
    }
  } catch (error) {
    throw new Error(error);
  }
});

export const getDetailPin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Pin.find({ _id: id })
      .populate("postedBy")
      .populate("comments.userComment");
    if (result) {
      res.json(result);
    } else {
      throw new Error("Category emty!");
    }
  } catch (error) {
    throw new Error(error);
  }
});

export const getMorePin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;

  try {
    const result = await Pin.find({
      category,
      _id: { $ne: id },
    })
      .populate("postedBy")
      .populate("save.userSave");
    if (result) {
      res.json(result);
    } else {
      throw new Error("Category emty!");
    }
  } catch (error) {
    throw new Error(error);
  }
});

export const searchPin = asyncHandler(async (req, res) => {
  const { searchTerm } = req.body;

  try {
    const result = await Pin.find({
      $or: [
        //options khong phan biet chu hoa chu thuong
        { title: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
        { about: { $regex: searchTerm, $options: "i" } },
      ],
    })
      .populate("postedBy")
      .populate("save.userSave");

    if (result) {
      res.json(result);
    } else {
      throw new Error("No found!");
    }
  } catch (error) {
    throw new Error(error);
  }
});

export const deletePin = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await Pin.findByIdAndDelete({ _id: id });
    res.json("Success!");
  } catch (error) {
    throw new Error(error);
  }
});

export const savePin = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { userSave } = req.body;

  try {
    await Pin.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          save: {
            userId: userSave.googleId,
            userSave: {
              _id: userSave._id,
              googleId: userSave.googleId,
              userName: userSave.userName,
              image: userSave.image,
            },
          },
        },
      },
      { new: true }
    );
    res.json("Save Pin Success!");
  } catch (error) {
    throw new Error(error);
  }
});

export const unSavePin = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { userId } = req.body;

  try {
    await Pin.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          save: {
            userId: userId,
          },
        },
      },
      { new: true }
    );
    res.json("UnSave Success!");
  } catch (error) {
    throw new Error(error);
  }
});

export const addComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { userComment, comments } = req.body;

  try {
    await Pin.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          comments: {
            userComment: {
              _id: userComment._id,
              googleId: userComment.googleId,
              userName: userComment.userName,
              image: userComment.image,
            },
            comments,
          },
        },
      },
      { new: true }
    );
    res.json("Save Pin Success!");
  } catch (error) {
    throw new Error(error);
  }
});

export const getPinOfUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const pinOfUser = await Pin.find({ userId: id })
      .populate("postedBy")
      .populate("save.userSave");

    if (pinOfUser) {
      res.json(pinOfUser);
    } else {
      throw new Error("Category emty!");
    }
  } catch (error) {
    throw new Error(error);
  }
});

export const getPinUserSave = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const pinOfUser = await Pin.find({
      "save.userId": id,
    })
      .populate("postedBy")
      .populate("save.userSave");

    if (pinOfUser) {
      res.json(pinOfUser);
    } else {
      throw new Error("Category emty!");
    }
  } catch (error) {
    throw new Error(error);
  }
});
