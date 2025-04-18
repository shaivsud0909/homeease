import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    role: { type: String, enum: ["user", "worker"], required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
