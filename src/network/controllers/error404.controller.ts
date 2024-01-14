import { Request, Response } from "express";
import handleErrorResponse from "../../utils/handleError";

export function error404(req: Request, res: Response) {
  try {
    return res.status(404).json({
      message: "PAGE_NOT_FOUND",
    });
  } catch (error) {
    return handleErrorResponse(res);
  }
}
