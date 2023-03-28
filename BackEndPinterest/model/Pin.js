import mongoose from "mongoose";

const PinSchema = new mongoose.Schema({
  title: String,
  about: String,
  destinantion: String,
  category: String,
  image: String,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  save: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Save",
    },
  ],

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const PinModel = mongoose.model("Pin", PinSchema);
export default PinModel;
