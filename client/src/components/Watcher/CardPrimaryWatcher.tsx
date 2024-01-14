import VideoPlayer from "../../hooks/VideoPlayer";
import styles from "./CardPrimaryWatcher.module.css";

export default function CardPrimaryWatcher({ movie }: { movie: any }) {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.left}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} draggable={false}/>
        </div>
        <div className={styles.right}>
          <h2>{movie.title}</h2>
          <ul>
            <li>
              <p style={{ fontSize: "17px", color: "#f6fa17d3" }}>
                {movie.vote_average}
              </p>
              <p style={{ fontSize: "12px", color: "#f6fa17d3" }}>/10</p>&nbsp;|
            </li>
            <li>
              <p style={{ fontSize: "14" }}>
                {movie.release_date.split("-")[0]} |
              </p>
            </li>
            <li>
              <p>{movie.quality}</p>
            </li>
          </ul>
          <p className={styles.overviewTop}>{movie.overview}</p>
        </div>
       
      </div>
      <p className={styles.overviewBottom}>{movie.overview}</p>


      <img
        className={styles.banner}
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        draggable={false}
      />
      <div className={styles.player}>
        <VideoPlayer
          source={movie.source}
          source_type={movie.source_type}
          title={movie.title}
        />
      </div>
    </div>
  );
}
