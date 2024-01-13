import { Response, Request } from "express";
export default function handleError(
  res: Response,
  code: number = 500,
  message: string = "INTERNAL_SERVER_ERROR"
): Response {
  return res.status(code).json({ message });
}
