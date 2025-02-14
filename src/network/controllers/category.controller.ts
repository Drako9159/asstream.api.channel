import mongoose from "mongoose";
import CategoryService from "../../service/CategoryService";
import handleError from "../../utils/handleError";
import { Request, Response } from "express";
import { getTwitchStreamUrl } from "../../utils/twitchAuto";
import { apiCategory, ICategory } from "../../utils/apiCategory";



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


import { isHLSAvailable, checkHLSAvailability } from "../../utils/isHLSAvailable";

import NodeCache from "node-cache";

// const cache = new NodeCache({ stdTTL: 60 * 60 * 24 * 7, checkperiod: 60 * 60 }); // 1 week
// const cache = new NodeCache({ stdTTL: 60 * 60 * 24, checkperiod: 60 * 60 }); // 1 day
// const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 }); // 10 minutes
// const cache = new NodeCache({ stdTTL: 60, checkperiod: 30 }); // 1 minute





const CACHE_SHORT = 60; // 1 minuto
const CACHE_MEDIUM = 600; // 10 minutos
const CACHE_LONG = 86400; // 1 día

const cache = new NodeCache();


// New version with cache, Promise All and validate Only liveFeeds, Experimental
export async function getApiChannel(req: Request, res: Response) {
  try {
    // Verificamos si la respuesta ya está en caché
    const cachedResponse = cache.get("api_channels");
    if (cachedResponse) {
      return res.status(200).json(cachedResponse);
    }

    const categoryService = new CategoryService();
    const categoriesWithEntries = await categoryService.getCategoriesPopulate();

    let categories: { [key: string]: any[] } = {};

    for (const e of categoriesWithEntries) {
      let activeEntries = e.entries.filter((i: any) => i.status === "active");
      let validEntries = [];

      if (e.name === "tvSpecials") {
        const twitchEntries = await Promise.all(
          activeEntries.map(async (i: any) => {
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
              return apiCategory(CategoryEntry);
            }
            return null;
          }
          ));
        validEntries = twitchEntries.filter(Boolean);

      } else if (e.name === "liveFeeds") {
        const liveFeedsEntries = await Promise.all(
          activeEntries.map(async (i: any) => {
            if (await checkHLSAvailability(i.content.videos.url)) {
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
            }
            return null;
          })
        );
        validEntries = liveFeedsEntries.filter(Boolean);

      } else {
        const validatedEntries = activeEntries.map((i: any) => {
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
        validEntries = validatedEntries.filter(Boolean);

      }

      if (validEntries.length > 0) {
        categories[e.name] = validEntries;
      }
    }

    // Ordenar categorías según prioridad y eliminar vacías
    const categoryOrder = ["liveFeeds", "movies", "tvSpecials"];
    const sortedCategories = Object.fromEntries(
      Object.entries(categories)
        .sort(([a], [b]) => {
          const indexA = categoryOrder.indexOf(a);
          const indexB = categoryOrder.indexOf(b);
          return (indexA === -1 ? 1 : indexA) - (indexB === -1 ? 1 : indexB);
        })
    );

    // Plantilla de respuesta
    const responseTemplate = {
      providerName: "Roku Developer Account",
      lastUpdated: new Date().toISOString(),
      language: "en",
      ...sortedCategories,
    };

    // Guardar en caché
    // cache.set("api_channels", responseTemplate);
    cache.set("api_channels", responseTemplate, CACHE_SHORT);

    return res.status(200).json(responseTemplate);
  } catch (error) {
    console.error("Error al obtener categorías con entradas:", error);
    return handleError(res);
  }
}

// New version with cache, Promise All and validate HLS for full content
export async function getApiChannelOld3(req: Request, res: Response) {
  try {
    // Verificamos si la respuesta ya está en caché
    const cachedResponse = cache.get("api_channels");
    if (cachedResponse) {
      return res.status(200).json(cachedResponse);
    }

    const categoryService = new CategoryService();
    const categoriesWithEntries = await categoryService.getCategoriesPopulate();

    let categories: { [key: string]: any[] } = {};

    for (const e of categoriesWithEntries) {
      let activeEntries = e.entries.filter((i: any) => i.status === "active");
      let validEntries = [];

      if (e.name === "tvSpecials") {
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
            validEntries.push(apiCategory(CategoryEntry));
          }
        }
      } else {
        const validatedEntries = await Promise.all(
          activeEntries.map(async (i: any) => {
            if (await checkHLSAvailability(i.content.videos.url)) {
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
            }
            return null;
          })
        );
        validEntries = validatedEntries.filter(Boolean);
      }

      if (validEntries.length > 0) {
        categories[e.name] = validEntries;
      }
    }

    // Ordenar categorías según prioridad y eliminar vacías
    const categoryOrder = ["liveFeeds", "movies", "tvSpecials"];
    const sortedCategories = Object.fromEntries(
      Object.entries(categories)
        .sort(([a], [b]) => {
          const indexA = categoryOrder.indexOf(a);
          const indexB = categoryOrder.indexOf(b);
          return (indexA === -1 ? 1 : indexA) - (indexB === -1 ? 1 : indexB);
        })
    );

    // Plantilla de respuesta
    const responseTemplate = {
      providerName: "Roku Developer Account",
      lastUpdated: new Date().toISOString(),
      language: "en",
      ...sortedCategories,
    };

    // Guardar en caché
    // cache.set("api_channels", responseTemplate);
    cache.set("api_channels", responseTemplate, CACHE_SHORT);

    return res.status(200).json(responseTemplate);
  } catch (error) {
    console.error("Error al obtener categorías con entradas:", error);
    return handleError(res);
  }
}

// Version with validate HLS Twitch or tvSpecials
export async function getApiChannelOld2(req: Request, res: Response) {
  try {
    const categoryService = new CategoryService();
    const categoriesWithEntries = await categoryService.getCategoriesPopulate();

    let categories: { [key: string]: any[] } = {};

    for (const e of categoriesWithEntries) {
      let activeEntries = e.entries.filter((i: any) => i.status === "active");

      if (e.name === "tvSpecials") {
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
    const categoryOrder = ["liveFeeds", "movies", "tvSpecials"]

    const orderedCategories = Object.entries(categories).sort(([a], [b]) => {
      const indexA = categoryOrder.indexOf(a);
      const indexB = categoryOrder.indexOf(b);

      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;

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

// Version without validate HLS Twitch or tvSpecials // Deprecated
export async function getApiChannelOld1(req: Request, res: Response) {
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