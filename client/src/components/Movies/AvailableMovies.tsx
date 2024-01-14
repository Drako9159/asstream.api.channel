import { useMoviesStore } from "../../store/movies";
import styles from "./AvailableMovies.module.css";
import playButton from "../../assets/icons/movies/play-button.svg";
import { Link } from "react-router-dom";

export default function AvailableMovies() {
  const movies = useMoviesStore((state) => state.movies);
  return (
    <div className={styles.container}>
      <h2>Available Movies</h2>

      <div className={styles.movies}>
        {!movies
          ? ""
          : movies.map((e: any) => {
              return (
                <Link to={`/movies/${e.id}`} key={e.id} style={{ textDecoration: "none", color: "#ffffff" }}>
                  <div className={styles.movie}>
                    <div className={styles.primary}>
                      <div className={styles.movieInside}>
                        <img
                          className={styles.poster}
                          src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                          draggable={false}
                        />
                        <img
                          className={styles.playButton}
                          src={playButton}
                          draggable={false}
                        />
                        <p>{e.title}</p>
                      </div>
                      <div className={styles.info}>
                        <div className={styles.infoInside}>
                          <h2>{e.title}</h2>
                          <div>
                            <ul>
                              <li>
                                <p
                                  style={{
                                    fontSize: "17px",
                                    color: "#f6fa17d3",
                                  }}
                                >
                                  {e.vote_average}
                                </p>
                                <p
                                  style={{
                                    fontSize: "12px",
                                    color: "#f6fa17d3",
                                  }}
                                >
                                  /10
                                </p>
                              </li>
                              <li style={{ fontSize: "14" }}>
                                {e.release_date.split("-")[0]}
                              </li>
                              <li>{e.quality}</li>
                            </ul>
                          </div>
                          <p
                            style={{
                              backgroundColor: "#7979796c",
                              padding: "2px 5px",
                            }}
                          >
                            {e.overview}
                          </p>
                        </div>
                        <img
                          className={styles.banner}
                          src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                          draggable={false}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
}
