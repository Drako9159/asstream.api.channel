import IUser from "./IUser";
import { Model } from "mongoose";
export default interface IUserModel extends Model<IUser> {
  encryptPassword(password: string): string;
  comparePassword(password: string, receivedPassword: string): string;
}
