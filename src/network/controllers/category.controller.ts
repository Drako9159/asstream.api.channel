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

import { startLiveStreamChecker, getTwitchStreamUrl } from "../../utils/twitchAuto";



export async function getApiChannel(req: Request, res: Response) {
  try {

    // Lista de canales a monitorear
    // const channelsToCheck = ["goddessalfa", "jessu", "esquizofrenia_natural", "ibai"];
    // Iniciar el proceso
    // startLiveStreamChecker(channelsToCheck);

    const categoryService = new CategoryService();
    const categoriesWithEntries = await categoryService.getCategoriesPopulate();

    let categories: { [key: string]: any[] } = {};


    categoriesWithEntries.forEach((e: any) => {

      const activeEntries = e.entries.filter((i: any) => i.status === "active");

      if (activeEntries.length > 0) {
        categories[e.name] = activeEntries.map((i: any) => {
          return {
            id: i._id,
            title: i.title,
            content: {
              dateAdded: "2025-01-20T00:34:52Z",

              videos: [i.content.videos],
              duration: i.content.duration,
              captions: [
                {
                  "url": "https://static-delivery.sr.roku.com/17058b9e-a7dc-477e-afaa-0e10d97ddb99/captions/HDCP_Error_RokuTipsandTricks_20210120T003500_cc_eng.vtt",
                  "language": "en",
                  "captionType": "CLOSED_CAPTION"
                }
              ],
              trickPlayFiles: [
                {
                  "url": "https://static-delivery.sr.roku.com/17058b9e-a7dc-477e-afaa-0e10d97ddb99/images/17058b9e-a7dc-477e-afaa-0e10d97ddb99-sd.bif",
                  "quality": "SD"
                },
                {
                  "url": "https://static-delivery.sr.roku.com/17058b9e-a7dc-477e-afaa-0e10d97ddb99/images/17058b9e-a7dc-477e-afaa-0e10d97ddb99-hd.bif",
                  "quality": "HD"
                },
                {
                  "url": "https://static-delivery.sr.roku.com/17058b9e-a7dc-477e-afaa-0e10d97ddb99/images/17058b9e-a7dc-477e-afaa-0e10d97ddb99-fhd.bif",
                  "quality": "FHD"
                }
              ],
              language: i.content.language,
              audioFormats: ["stereo"],
              audioTracks: [
                {
                  language: "en",
                  label: "English (Original)"
                }
              ]
            },
            thumbnail: i.thumbnail,
            backdrop: i.backdrop,
            shortDescription: i.shortDescription,
            releaseDate: i.releaseDate,
            longDescription: i.longDescription,
            tags: [i.tag, "cable",
              "content",
              "error",
              "fix",
              "hdcp",
              "hdmi",
              "how",
              "protected",
              "roku",
              "roku_101",
              "screen",
              "streaming",
              "to",
              "troubleshooting"],
            genres: ["Entretenimiento"],
            rating: {
              "rating": "NR",
              "ratingSource": "USA_PR"
            },
            externalIds: [
              {
                "id": "Roku101_HDCP",
                "idType": "PARTNER_ASSET_ID"
              },
              {
                "idType": "PARTNER_TITLE_ID",
                "id": "Roku101_HDCP"
              }
            ]

          }
        }

        );
      }
    });

    const template = {
      providerName: "Roku Developer Account",
      language: "en",
      lastUpdated: "2025-11-18T09:04:00Z",
      ...categories,
    };

    // Reorganizar el objeto para que "liveFeeds" aparezca primero
    /*
    const orderedCategories: { [key: string]: any[] } = {};
    if (categories["liveFeeds"]) {
      orderedCategories["liveFeeds"] = categories["liveFeeds"];
      delete categories["liveFeeds"];
    }
    Object.assign(orderedCategories, categories);

    return res.json(orderedCategories);*/

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