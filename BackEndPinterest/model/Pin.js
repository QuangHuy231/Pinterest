import mongoose from "mongoose";

const PinSchema = new mongoose.Schema({
  title: String,
  about: String,
  destinantion: String,
  category: String,
  image: String,
  userId: String,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  save: [
    {
      userId: String,
      userSave: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    },
  ],

  comments: [
    {
      userComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
      comments: String,
    },
  ],
});

const PinModel = mongoose.model("Pin", PinSchema);
export default PinModel;
