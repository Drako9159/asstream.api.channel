import mongoose from "mongoose";
import CategoryService from "../../service/CategoryService";
import handleError from "../../utils/handleError";
import e, { Request, Response } from "express";

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

import { getTwitchStreamUrl } from "../../utils/twitchAuto";
import { apiCategory, ICategory } from "../../utils/apiCategory";





export async function getApiChannel(req: Request, res: Response) {
  try {
    const categoryService = new CategoryService();
    const categoriesWithEntries = await categoryService.getCategoriesPopulate();

    let categories: { [key: string]: any[] } = {};

    for (const e of categoriesWithEntries) {
      let activeEntries = e.entries.filter((i: any) => i.status === "active");

      if (e.name.toLowerCase() === "twitch") {
        let twitchEntries = [];

        for (const i of activeEntries) {
          const streamData = await getTwitchStreamUrl(i.title);

          if (streamData && streamData.link) {
            const CategoryEntry: ICategory = {
              _id: i._id,
              title: i.title,
              videos: {
                videoType: i.content.videos.videoType,
                url: streamData.link, // Se usa el link de la función
                quality: i.content.videos.quality
              },
              duration: i.content.duration,
              language: i.content.language,
              thumbnail: i.thumbnail,
              backdrop: i.backdrop,
              shortDescription: i.shortDescription,
              releaseDate: i.releaseDate,
              longDescription: i.longDescription,
              tag: i.tag
            };

            twitchEntries.push(apiCategory(CategoryEntry));
          }
        }

        if (twitchEntries.length > 0) {
          categories[e.name] = twitchEntries;
        }
      } else {
        if (activeEntries.length > 0) {
          categories[e.name] = activeEntries.map((i: any) => {
            const CategoryEntry: ICategory = {
              _id: i._id,
              title: i.title,
              videos: {
                videoType: i.content.videos.videoType,
                url: i.content.videos.url,
                quality: i.content.videos.quality
              },
              duration: i.content.duration,
              language: i.content.language,
              thumbnail: i.thumbnail,
              backdrop: i.backdrop,
              shortDescription: i.shortDescription,
              releaseDate: i.releaseDate,
              longDescription: i.longDescription,
              tag: i.tag
            };
            return apiCategory(CategoryEntry);
          });
        }
      }
    }

    // Order categories by first to last: liveFeeds, movies, twitch
    const categoryOrder = ["liveFeeds", "movies", "twitch"]

    const orderedCategories = Object.entries(categories).sort(([a], [b]) => {
      const indexA = categoryOrder.indexOf(a);
      const indexB = categoryOrder.indexOf(b);

      if(indexA === -1 && indexB === -1) return 0;
      if(indexA === -1) return 1;
      if(indexB === -1) return -1;

      return indexA - indexB;
    })

    const sortedCategories = Object.fromEntries(orderedCategories);


    const template = {
      providerName: "Roku Developer Account",
      lastUpdated: "2025-11-18T09:04:00Z",
      language: "en",
      ...sortedCategories,
    };

    return res.status(200).json(template);
  } catch (error) {
    console.error("Error al obtener categorías con entradas:", error);
    return handleError(res);
  }
}




export async function getApiChannelOld(req: Request, res: Response) {
  try {

    const categoryService = new CategoryService();
    const categoriesWithEntries = await categoryService.getCategoriesPopulate();

    let categories: { [key: string]: any[] } = {};

    categoriesWithEntries.forEach((e: any) => {
      let activeEntries = e.entries.filter((i: any) => i.status === "active");
      if (activeEntries.length > 0) {
        categories[e.name] = activeEntries.map((i: any) => {
          const CategoryEntry: ICategory = {
            _id: i._id,
            title: i.title,
            videos: {
              videoType: i.content.videos.videoType,
              url: i.content.videos.url,
              quality: i.content.videos.quality
            },
            duration: i.content.duration,
            language: i.content.language,
            thumbnail: i.thumbnail,
            backdrop: i.backdrop,
            shortDescription: i.shortDescription,
            releaseDate: i.releaseDate,
            longDescription: i.longDescription,
            tag: i.tag
          }
          return apiCategory(CategoryEntry)
        }
        );
      }
    });

    const template = {
      providerName: "Roku Developer Account",
      lastUpdated: "2025-11-18T09:04:00Z",
      language: "en",
      ...categories,
    };

    return res.status(200).json(template);
  } catch (error) {
    console.error("Error al obtener categorías con entradas:", error);
    return handleError(res);
  }
}


// Reorganizar el objeto para que "liveFeeds" aparezca primero
/*
const orderedCategories: { [key: string]: any[] } = {};
if (categories["liveFeeds"]) {
  orderedCategories["liveFeeds"] = categories["liveFeeds"];
  delete categories["liveFeeds"];
}
Object.assign(orderedCategories, categories);

return res.json(orderedCategories);*/
/*
    const applyTwitchUrl: { [key: string]: any[] } = {};
    if (categories["twitch"]) {
      const twitchChannels = categories["twitch"];
      const promises = twitchChannels.map(async (channel: any) => {
        const twitchChannel = await getTwitchStreamUrl(channel.title);
        if (twitchChannel) {
          channel.content.videos[0].url = twitchChannel.link;
          applyTwitchUrl[channel.title] = channel;
        }
      });
      await Promise.all(promises);
    }*/

// Object.assign(applyTwitchUrl, categories);

//return res.json(applyTwitchUrl);



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