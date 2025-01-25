import { useEffect } from "react";
import { getMoviesRequest } from "../api/movies";
import { useMoviesStore } from "../store/movies";
import AvailableMovies from "../components/Movies/AvailableMovies";
import AvailableIptv from "../components/IPTV/AvailableIptv";

export default function Movies() {
  const setMovies = useMoviesStore((state) => state.setMoviesStore);

  useEffect(() => {
    async function api() {
      const res = await getMoviesRequest();
      setMovies(res.data.content);
    }
    api();
  }, []);

  return (
    <>
      <AvailableMovies />
      <AvailableIptv />
    </>
  );
}
