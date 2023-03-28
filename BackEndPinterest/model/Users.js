import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  googleId: String,
  userName: String,
  image: String,
  refreshToken: String,
});

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
