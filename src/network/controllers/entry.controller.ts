import mongoose from "mongoose";
import CategoryModel from "../../domain/model/CategoryModel";
import EntryModel from "../../domain/model/EntryModel";
import handleError from "../../utils/handleError";
import { Request, Response } from "express";

export async function pushEntry(req: Request, res: Response) {
  try {
    const {
      categoryId,
      longDescription,
      status,
      thumbnail,
      releaseDate,
      genre,
      tag,
      shortDescription,
      title,
      contentDuration,
      contentVideoType,
      contentVideoUrl,
      contentVideoQuality,
      contentLanguage,
      contentDateAdded,
      backdrop,
    }: any = req.body;

    console.log({
      longDescription: longDescription,
      status: status,
      thumbnail: thumbnail,
      releaseDate: releaseDate,
      genre: genre,
      tag: tag,
      shortDescription: shortDescription,
      title: title,
      content: {
        duration: contentDuration,
        videos: {
          videoType: contentVideoType,
          url: contentVideoUrl,
          quality: contentVideoQuality,
        },
        language: contentLanguage,
        dateAdded: contentDateAdded,
      },
      backdrop: backdrop,
    });

    const newEntry = new EntryModel({
      longDescription: longDescription,
      status: status,
      thumbnail: thumbnail,
      releaseDate: releaseDate,
      genre: genre,
      tag: tag,
      shortDescription: shortDescription,
      title: title,
      content: {
        duration: contentDuration,
        videos: {
          videoType: contentVideoType,
          url: contentVideoUrl,
          quality: contentVideoQuality,
        },
        language: contentLanguage,
        dateAdded: contentDateAdded,
      },
      backdrop: backdrop,
    });

    newEntry
      .save()
      .then((savedEntry) => {
        return CategoryModel.findByIdAndUpdate(
          categoryId,
          { $push: { entries: savedEntry._id } },
          { new: true }
        );
      })
      .then((updatedCategory) => {
        console.log("Entry saved");
      })
      .catch((error) => {
        console.error("Error al guardar el Entry:", error);
      });

    return res.status(201).json({ message: "ENTRY_CREATED" });
  } catch (error) {
    console.log(error);
    return handleError(res);
  }
}

export async function deleteEntry(req: Request, res: Response) {
  try {
    const id: any = req.params.id;
    const isId = mongoose.Types.ObjectId.isValid(id);
    if (!isId) return handleError(res, 404, "ENTRY_NOT_FOUND");
    const entryDeleted = await EntryModel.findOneAndDelete({ _id: id });
    if (!entryDeleted) return handleError(res, 404, "ENTRY_NOT_FOUND");

    await CategoryModel.updateOne({ entries: id }, { $pull: { entries: id } });

    return res.status(204).json({ message: "ENTRY_DELETED" });
  } catch (error) {
    console.log(error);
    return handleError(res);
  }
}

export async function updateEntry(req: Request, res: Response) {
  try {
    const {
      id,
      categoryId,
      longDescription,
      status,
      thumbnail,
      releaseDate,
      genre,
      tag,
      shortDescription,
      title,
      contentDuration,
      contentVideoType,
      contentVideoUrl,
      contentVideoQuality,
      contentLanguage,
      contentDateAdded,
      backdrop,
    }: any = req.body;

    const updatedEntry = {
      longDescription,
      status,
      thumbnail,
      releaseDate,
      genre,
      tag,
      shortDescription,
      title,
      content: {
        duration: contentDuration,
        videos: {
          videoType: contentVideoType,
          url: contentVideoUrl,
          quality: contentVideoQuality,
        },
        language: contentLanguage,
        dateAdded: contentDateAdded,
      },
      backdrop,
    };

    // Actualizar el Entry
    const updatedEntryResult = await EntryModel.findByIdAndUpdate(
      { _id: id },
      updatedEntry,
      { new: true }
    );

    if (!updatedEntryResult) {
      throw new Error("Entry not found");
    }
    // Obtener la categoría actual asociada a la entrada
    const currentCategory = await CategoryModel.findOne({ entries: id });

    // Verificar si el categoryId ha cambiado
    if (
      categoryId &&
      currentCategory &&
      currentCategory._id.toString() !== categoryId
    ) {
      // Actualizar la referencia en la antigua categoría
      await CategoryModel.updateOne(
        { entries: id },
        { $pull: { entries: id } }
      );

      // Agregar la referencia en la nueva categoría
      await CategoryModel.updateOne(
        { _id: categoryId },
        { $addToSet: { entries: id } }
      );
    }

    console.log("Entry and Category updated");
    return res.status(200).json({ message: "ENTRY_UPDATED" });
  } catch (error) {
    console.error("Error al actualizar el Entry:", error);
    return handleError(res);
  }
}

export async function getAllEntries(req: Request, res: Response) {
  try {
    const categoriesWithEntries = await CategoryModel.find({}).populate("entries");

    // Extraer las entradas de cada categoría y agregar el categoryId a cada entrada
    const entriesWithCategory: any[] = [];
    categoriesWithEntries.forEach(category => {
      const categoryId = category._id.toString();
      const categoryName = category.name.toString();

      category.entries.forEach((entry: any) => {
        entriesWithCategory.push({ ...entry.toObject(), categoryId, categoryName });
      });
    });

    return res.status(200).json(entriesWithCategory);





  } catch (error) {
    console.log("Error on get data entries");
    return handleError(res);
  }
}
