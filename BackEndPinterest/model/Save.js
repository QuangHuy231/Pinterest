import mongoose from "mongoose";

const SaveSchema = new mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  userId: String,
});

const SaveModel = mongoose.model("Save", SaveSchema);
export default SaveModel;
