import VideoPlayer from "../../hooks/VideoPlayer";
import styles from "./CardWatcherIptv.module.css";

export default function CardWatcherIptv({ movie }: { movie: any }) {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.left}>
          <img src={`${movie.poster_path}`} draggable={false}/>
        </div>
        <div className={styles.right}>
          <h2>{movie.title}</h2>
          <p className={styles.overviewTop}>{movie.overview}</p>
        </div>
      </div>
      <p className={styles.overviewBottom}>{movie.overview}</p>
      <img
        className={styles.banner}
        src={`${movie.backdrop_path}`}
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
