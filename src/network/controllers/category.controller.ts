import mongoose from "mongoose";
import CategoryService from "../../service/CategoryService";
import handleError from "../../utils/handleError";
import { Request, Response } from "express";

export async function createCategory(req: Request, res: Response) {
  try {
    const { name }: any = req.body;

    const fields = ["name"].filter((field) => !req.body[field]);
    if (fields.length > 0) {
      return handleError(res, 400, `require: [${fields.join(", ")}]`);
    }

    const categoryService = new CategoryService();
    const result = await categoryService.createCategory(name as string);

    return res.status(201).json({ message: "CATEGORY_CREATED", ...result });
  } catch (error) {
    console.log(error);
    return handleError(res);
  }
}

export async function deleteCategory(req: Request, res: Response) {
  try {
    const id: any = req.params.id;

    const fields = ["id"].filter((field) => !req.params[field]);
    if (fields.length > 0) {
      return handleError(res, 400, `require: [${fields.join(", ")}]`);
    }

    const isId = mongoose.Types.ObjectId.isValid(id);
    if (!isId) return handleError(res, 404, "CATEGORY_NOT_FOUND");

    const categoryService = new CategoryService();
    const category = await categoryService.deleteCategory(id);
    if (!category) return handleError(res, 404, "CATEGORY_NOT_FOUND");

    return res.status(204).json({ message: "CATEGORY_DELETED" });
  } catch (error) {
    console.log(error);
    return handleError(res);
  }
}

export async function updateCategory(req: Request, res: Response) {
  try {
    const { id, name }: any = req.body;

    const fields = ["id", "name"].filter((field) => !req.body[field]);
    if (fields.length > 0) {
      return handleError(res, 400, `require: [${fields.join(", ")}]`);
    }

    const isId = mongoose.Types.ObjectId.isValid(id);
    if (!isId) return handleError(res, 404, "CATEGORY_NOT_FOUND");

    const categoryService = new CategoryService();
    const category = await categoryService.updateCategory(id, name);

    if (!category) return handleError(res, 404, "CATEGORY_NOT_FOUND");
    return res.status(200).json({ message: "CATEGORY_UPDATED" });
  } catch (error) {
    console.log(error);
    return handleError(res);
  }
}



export async function getApiChannel(req: Request, res: Response) {
  try {
   
    const categoryService = new CategoryService();
    const categoriesWithEntries = await categoryService.getCategoriesPopulate();

    let categories: { [key: string]: any[] } = {};

    categoriesWithEntries.forEach((e: any) => {
      if (e.entries.length > 0) {
        categories[e.name] = e.entries.map((i: any) => ({
          longDescription: i.longDescription,
          thumbnail: i.thumbnail,
          releaseDate: i.releaseDate,
          genres: [i.genre],
          tags: [i.tag],
          id: i._id,
          shortDescription: i.shortDescription,
          title: i.title,
          content: {
            duration: i.content.duration,
            videos: [i.content.videos],
            language: i.content.language,
            dateAdded: i.content.dateAdded,
          },
          backdrop: i.backdrop,
        }));
      }
    });

    const template = {
      providerName: "Roku Developers",
      language: "en-US",
      lastUpdated: "2024-01-15T02:01:00+02:00",
      ...categories,
    };

    return res.status(200).json(template);
  } catch (error) {
    console.error("Error al obtener categorías con entradas:", error);
    return handleError(res);
  }
}




export async function getAllCategories(req: Request, res: Response) {
  try {
    const categoryServce = new CategoryService();
    const categoriesWithEntries = await categoryServce.getCategories();
    return res.status(200).json(categoriesWithEntries);
  } catch (error) {
    console.error("Error al obtener categorías con entradas:", error);
    return handleError(res);
  }
}

export async function getCategoryById(req: Request, res: Response) {
  try {
    const id: any = req.params.id;
    const fields = ["id"].filter((field) => !req.params[field]);
    if (fields.length > 0) {
      return handleError(res, 400, `require: [${fields.join(", ")}]`);
    }
    const isId = mongoose.Types.ObjectId.isValid(id);
    if (!isId) return handleError(res, 404, "CATEGORY_NOT_FOUND");

    const categoryService = new CategoryService();
    const category = await categoryService.getCategoryById(id);
    if (!category) return handleError(res, 404, "CATEGORY_NOT_FOUND");
    return res.status(200).json(category);
  } catch (error) {
    console.log(error);
    return handleError(res);
  }
}