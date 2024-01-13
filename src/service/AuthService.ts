import { AuthRepository } from "../domain/repository/AuthRepository";
import UserModel from "../domain/model/UserModel";
import config from "../config";
import { sign } from "jsonwebtoken";
import { IAuthResponse } from "../domain/interface/IAuthResponse";

class AuthService implements AuthRepository {
  private firstName: string | undefined;
  private lastName: string | undefined;
  private email: string;
  private password: string;

  constructor(
    email: string,
    password: string,
    firsName?: string,
    lastName?: string
  ) {
    this.email = email;
    this.password = password;
    this.firstName = firsName;
    this.lastName = lastName;
  }

  async register() {
    const exists = await UserModel.findOne({ email: this.email });
    if (exists) return "USER_EXISTS";

    const userDB = await new UserModel({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: await UserModel.encryptPassword(this.password),
    });

    await userDB.save();

    const jwt = sign(
      { id: userDB.id, role: userDB.role },
      config.jwtSecret as string,
      {
        expiresIn: "4h",
      }
    );

    const user: IAuthResponse = {
      user: {
        id: userDB._id,
        firstName: userDB.firstName,
        lastName: userDB.lastName,
        email: userDB.email,
        createdAt: userDB.createdAt,
        updatedAt: userDB.updatedAt,
        role: userDB.role,
      },
      jwt,
    };

    return user;
  }

  async login() {
    const userDB = await UserModel.findOne({ email: this.email });

    if (!userDB) return "USER_NOT_FOUND";
    if (!userDB.confirmed) return "USER_NOT_CONFIRMED";
    if (userDB.blocked) return "USER_BLOCKED";
    const validPassword = await UserModel.comparePassword(
      this.password,
      userDB.password
    );
    if (!validPassword) return "INVALID_PASSWORD";
    const jwt = sign(
      { id: userDB.id, role: userDB.role },
      config.jwtSecret as string,
      {
        expiresIn: "4h",
      }
    );

    const user: IAuthResponse = {
      user: {
        id: userDB._id,
        firstName: userDB.firstName,
        lastName: userDB.lastName,
        email: userDB.email,
        createdAt: userDB.createdAt,
        updatedAt: userDB.updatedAt,
        role: userDB.role,
      },
      jwt,
    };

    return user;
  }
}

export default AuthService;
