import { useEffect, useState } from "react";
import { deleteMovieRequest, getMoviesRequest } from "../../api/movies";
import { useMoviesStore } from "../../store/movies";
import styles from "./CardPrimaryDashboard.module.css";
import UpdateMovie from "../Search/UpdateMovie";

export default function CardPrimaryDashboard() {
 
  const setMovies = useMoviesStore((state) => state.setMoviesStore);
  const movies = useMoviesStore((state) => state.movies);
  const [item, setItem] = useState<any>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  useEffect(() => {
    async function api() {
      const res = await getMoviesRequest();
      setMovies(res.data.content);
    }
    api();
  }, []);

  

  async function deleteMovie(id: string) {
    const res = await deleteMovieRequest(id);
    if (res.status === 204) {
      setMovies(movies.filter((e: any) => e.id !== id));
    }
  }

  function handleUpdate(id: string, element: any) {
    setItem({ id: id, element: element });
    setIsUpdate(false);
  }

  return (
    <div className={styles.container}>
      {!movies
        ? "No content"
        : movies.map((e: any) => {
            return (
              <div className={styles.card} key={e.id}>
                <p>Title: {e.title}</p>
                <p>Id: {e.id}</p>
                <p>Language: {e.original_language}</p>
                <p>Type: {e.media_type}</p>
                <p>Date Release: {e.release_date}</p>
                <p>Quality: {e.quality}</p>
                <p>Source: {e.source}</p>
                <p>Source Type: {e.source_type}</p>
                <div className={styles.buttons}>
                  <button onClick={() => deleteMovie(e.id)}>Delete</button>
                  <button onClick={() => handleUpdate(e.id, e)}>Edit</button>
                </div>
              </div>
            );
          })}
      {!isUpdate || !item ? (
        ""
      ) : (
        <UpdateMovie
          id={item.id}
          element={item.element}
          setIsUpdate={setIsUpdate}
        />
      )}
    </div>
  );
}
