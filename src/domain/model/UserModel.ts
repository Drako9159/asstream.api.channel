import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";
import IUser from "../interface/IUser";
import IUserModel from "../interface/IUserMethods";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required!"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "Email is invalid!"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
    resetPasswordToken: {
      type: String,
    },
    confirmationToken: {
      type: String,
    },
    confirmed: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["public", "admin"],
      default: "public",
    },
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

UserSchema.static("encryptPassword", async (password: string) => {
  const salt = await bcryptjs.genSalt(12);
  return await bcryptjs.hash(password, salt);
});

UserSchema.static(
  "comparePassword",
  async (password: string, receivedPassword: string) => {
    return await bcryptjs.compare(password, receivedPassword);
  }
);

const UserModel = model<IUser, IUserModel>("User", UserSchema);
export default UserModel;
