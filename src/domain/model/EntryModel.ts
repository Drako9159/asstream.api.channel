import { Schema, model } from "mongoose";
import IEntry from "../interface/IEntry";

const EntrySchema = new Schema(
  {
    longDescription: {
      type: String,
      required: [true, "longDescription is required!"],
    },
    status: {
      type: String,
      required: [true, "status is required!"],
    },
    thumbnail: {
      type: String,
      required: [true, "thumbnail is required!"],
    },
    releaseDate: {
      type: String,
      required: [true, "releaseDate is required!"],
    },
    genre: {
      type: String,
      required: [true, "genre is required!"],
    },
    tag: {
      type: String,
      required: [true, "tag is required!"],
    },
    shortDescription: {
      type: String,
      required: [true, "shortDescription is required!"],
    },
    title: {
      type: String,
      required: [true, "title is required!"],
    },
    content: {
      type: Object,
      required: [true, "content is required!"],
    },
    backdrop: {
      type: String,
      required: [true, "backdrop is required!"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


const EntryModel = model<IEntry>("Entry", EntrySchema);
export default EntryModel;
