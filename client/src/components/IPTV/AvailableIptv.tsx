import { useIptvStore } from "../../store/iptv";
import { useEffect } from "react";
import styles from "./AvailableIptv.module.css";
import playButton from "../../assets/icons/movies/play-button.svg";
import { Link } from "react-router-dom";
import { getIptvRequest } from "../../api/iptvs";

export default function AvailableIptv() {
  const setIptv = useIptvStore((state) => state.setIptvStore);

  useEffect(() => {
    async function api() {
      const res = await getIptvRequest();
      setIptv(res.data.content);
    }
    api();
  }, []);
  const iptvs = useIptvStore((state) => state.iptvs);

  return (
    <div className={styles.container}>
      <h2>Available IPTV</h2>

      <div className={styles.movies}>
        {!iptvs
          ? ""
          : iptvs.map((e: any) => {
              return (
                <Link
                  to={`/iptvs/${e.id}`}
                  key={e.id}
                  style={{ textDecoration: "none", color: "#ffffff" }}
                >
                  <div className={styles.movie}>
                    <div className={styles.primary}>
                      <div className={styles.movieInside}>
                        <img
                          className={styles.poster}
                          src={`${e.poster_path}`}
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
                          src={`${e.poster_path}`}
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
