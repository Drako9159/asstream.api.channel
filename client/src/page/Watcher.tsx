import { useEffect, useState } from "react";
import { getMovieRequest } from "../api/movies";
import CardPrimaryWatcher from "../components/Watcher/CardPrimaryWatcher";
import { useParams } from "react-router-dom";


export default function Watcher() {
  const [movie, setMovie] = useState<any>({});
  const routeParams = useParams();

  useEffect(() => {
    async function api() {
      const res = await getMovieRequest(`${routeParams.id}`);
      setMovie(res.data.content);
    }
    api();
  }, []);

  return <div>{!movie.id ? "No content" : <CardPrimaryWatcher movie={movie}/>}</div>;
}
