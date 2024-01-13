import { connect } from "mongoose";
import config from "../config";

export async function connectDB() {
  try {
    await connect(config.mongoDB as string);
    console.log("[database] is connected");
  } catch (error) {
    console.log("Failed to connect database");
  }
}
