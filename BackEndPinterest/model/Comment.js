import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  comments: String,
});

const CommentModel = mongoose.model("Comment", CommentSchema);
export default CommentModel;
