import VideoPlayer from "../../hooks/VideoPlayer";
import { useMoviesStore } from "../../store/movies";
import styles from "./CardPrimaryMovie.module.css";

export default function CardPrimaryMovie() {
  const movies = useMoviesStore((state) => state.movies);
  return (
    <div className={styles.container}>
      {!movies
        ? ""
        : movies.map((e: any) => {
            return <div key={e.id}>
                <h2>{e.title}</h2>
                <VideoPlayer source={e.source} source_type={e.source_type} title={e.title}/>
            </div>;
          })}
    </div>
  );
}
