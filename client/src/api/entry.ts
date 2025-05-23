import axios from "./axios";
import { AxiosResponse } from "axios";

export async function checkStatusEntry(): Promise<AxiosResponse> {
  return await axios.get(`/channel`);
}

export async function getAllEntry(): Promise<AxiosResponse> {
  return await axios.get(`/entry`);
}

export async function deleteEntry(id: string): Promise<AxiosResponse> {
  return await axios.delete(`/entry/${id}`);
}

export async function updateEntry(element: any): Promise<AxiosResponse> {
  const entry = {
    id: element._id,
    categoryId: element.categoryIdForm,
    description: element.description,
    status: element.isActive,
    thumbnail: element.thumbnail,
    releaseDate: element.releaseData,
    genre: element.genre,
    tag: element.tag,
    title: element.title,
    contentDuration: element.content.duration,
    contentVideoType: element.content.videos.videoType,
    contentVideoUrl: element.source,
    contentVideoQuality: element.quality,
    contentLanguage: element.content.language,
    contentDateAdded: element.content.dateAdded,
    backdrop: element.backdrop,
  };

  return await axios.put(`/entry`, { ...entry });
}


