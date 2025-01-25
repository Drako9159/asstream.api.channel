import { useRef } from "react";
import styles from "./Search.module.css";
import { getMoviesRequest, updateMovieRequest } from "../../api/movies";
import { useMoviesStore } from "../../store/movies";

// interface UpdateMovieProps {
//   setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
// }

export default function UpdateMovie({
  id,
  element,
  setIsUpdate,
}: {
  id: string;
  element: any;
  setIsUpdate: any;
}) {
  const setMovies = useMoviesStore((state) => state.setMoviesStore);

  const sourceRef = useRef<HTMLInputElement>(null);
  const sourceTypeRef = useRef<HTMLSelectElement>(null);
  const qualityRef = useRef<HTMLSelectElement>(null);

  async function api() {
    const res = await getMoviesRequest();
    setMovies(res.data.content);
  }

  function handleClick() {
    setIsUpdate(false);
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const sourceValue = sourceRef.current?.value;
    const qualityValue = qualityRef.current?.value;
    const sourceTypeValue = sourceTypeRef.current?.value;
    const prepare = {
      ...element,
      quality: qualityValue,
      source: sourceValue,
      source_type: sourceTypeValue,
    };

    const res = await updateMovieRequest(id, prepare);
    if (res.status === 200) {
      await api();
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.right}>
          <form onSubmit={handleSend}>
            <h2 style={{ margin: "0" }}>Quality & Source</h2>
            <select required id="quality-selector" ref={qualityRef}>
              <option value="Cam">Cam</option>
              <option value="TS-HQ">TS-HQ</option>
              <option value="HD">HD</option>
              <option value="WEB-S">WEB-S</option>
            </select>
            <select required id="sourceType-selector" ref={sourceTypeRef}>
              <option value="video/mp4">mp4</option>
              <option value="video/webm">webm</option>
              <option value="video/x-matroska">mkv</option>
              <option value="video/mp2t">ts</option>
              <option value="application/x-mpegURL">ts-m3u8</option>
            </select>
            <input
              type="text"
              name="source"
              id="source"
              placeholder="source"
              required
              ref={sourceRef}
            />
            <div style={{ display: "flex", gap: "5px" }}>
              <button type="submit">Send</button>
              <button
                onClick={() => handleClick()}
                type="button"
                style={{ backgroundColor: "red" }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <div>
          {!element ? (
            ""
          ) : (
            <div className={styles.extra}>
              <div className={styles.result}>
                <h3>{element.title}</h3>
                <h3>{element.name}</h3>
                <h3 style={{ color: "#cccccc" }}>{element.media_type}</h3>
                <p>{element.overview}</p>
                {!element.poster_path ? (
                  ""
                ) : (
                  <img
                    className={styles.poster}
                    src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`}
                    draggable={false}
                  />
                )}
                {!element.backdrop_path ? (
                  ""
                ) : (
                  <img
                    className={styles.banner}
                    src={`https://image.tmdb.org/t/p/w500/${element.backdrop_path}`}
                    draggable={false}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
