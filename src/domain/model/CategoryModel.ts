import { Schema, model, Types } from "mongoose";
import ICategoryModel from "../interface/ICategoryModel";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    entries: [{ type: Types.ObjectId, ref: "Entry", cascade: true }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CategoryModel = model<ICategoryModel>("Category", CategorySchema);
export default CategoryModel;
