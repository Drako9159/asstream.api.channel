"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const envFound = dotenv_1.default.config();
if (envFound.error) {
    //throw new Error("Couldn't find .env file !!");
    console.log("[server] please set the environment variables ");
}
exports.default = {
    port: process.env.PORT || 3000,
    mongoDB: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    apiToken: process.env.API_TOKEN,
    tbMoviesUrl: process.env.TB_MOVIES_URL,
};
