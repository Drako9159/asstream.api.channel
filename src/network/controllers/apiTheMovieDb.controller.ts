import { Request, Response } from "express";
import handleError from "../../utils/handleError";
import { apiSearch } from "../../utils/apiTheMovieDb";

export async function search(req: Request, res: Response) {
  try {
    const { title, language, page } = req.body;
    const data = await apiSearch(title, language, page);
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return handleError(res);
  }
}
