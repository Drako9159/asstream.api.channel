import { Request, Response } from "express";
import handleError from "../../utils/handleError";
import AuthService from "../../service/AuthService";

export async function register(req: Request, res: Response) {
  try {
    const { email, password, firstName, lastName } = req.body;
    const fields = ["email", "password", "firstName", "lastName"].filter(
      (field) => !req.body[field]
    );
    if (fields.length > 0) {
      return handleError(res, 400, `require: [${fields.join(", ")}]`);
    }
    const auth = new AuthService(email, password, firstName, lastName);
    const user = await auth.register();
    if (user === "USER_EXISTS") return handleError(res, 400, user);
    return res
      .cookie("access_token", user.jwt, {
        httpOnly: true,
        secure: true, // for cookies with https
        maxAge: 3600000, // 1h duration
        //sameSite: "none"
      })
      .status(201)
      .json({ message: "SUCCESSFULLY_REGISTERED", ...user });
  } catch (error) {
    console.log(error);
    return handleError(res);
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const fields = ["email", "password"].filter((field) => !req.body[field]);
    if (fields.length > 0) {
      return handleError(res, 400, `require: [${fields.join(", ")}]`);
    }
    const auth = new AuthService(email, password);
    const user = await auth.login();
    if (user === "USER_NOT_FOUND") return handleError(res, 404, user);
    if (user === "USER_NOT_CONFIRMED") return handleError(res, 401, user);
    if (user === "INVALID_PASSWORD") return handleError(res, 401, user);
    if (user === "USER_BLOCKED") return handleError(res, 401, user);

    return res
      .cookie("access_token", user.jwt, {
        httpOnly: true,
        secure: true, // for cookies with https
        maxAge: 3600000, // 1h duration
        //sameSite: "none"
      })

      .status(200)
      .json({ message: "SUCCESSFULLY_LOGIN", ...user });
  } catch (error) {
    return handleError(res);
  }
}

export async function logout(req: Request, res: Response) {
  try {
    return res
      .cookie("access_token", "", {
        expires: new Date(0),
      })
      .status(200)
      .json({ message: "SUCCESSFULLY_LOGOUT" });
  } catch (error) {
    return handleError(res);
  }
}
