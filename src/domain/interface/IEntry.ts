interface Video {
  videoType: string;
  url: string;
  quality: string;
}

interface Content {
  duration: number;
  videos: Video;
  language: string;
  dateAdded: string;
}

export default interface IEntry {
  longDescription: string;
  status: string;
  thumbnail: string;
  releaseDate: string;
  genre: string;
  tag: string;
  shortDescription: string;
  title: string;
  content: Content;
  backdrop: string;
}
