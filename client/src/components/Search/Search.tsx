import { pushElementMovieRequest, searchRequest } from "../../api/search";
import { useRef, useState } from "react";
import { useSearchStore } from "../../store/search";
import styles from "./Search.module.css";
import { getMoviesRequest } from "../../api/movies";
import { useMoviesStore } from "../../store/movies";

export default function Search({ setComponent }: { setComponent: any }) {
  const setMovies = useMoviesStore((state) => state.setMoviesStore);
  const setResultsStore = useSearchStore((state) => state.setResultsStore);
  const results = useSearchStore((state) => state.results);
  const [item, setItem] = useState<any>(null);
  const [isSelected, setIsSelected] = useState<boolean>(true);

  async function api(title: string, language: string, page: string) {
    await searchRequest(title, language, page).then((res) => {
      setResultsStore(res.data.content.results);
    });
  }

  const titleRef = useRef<HTMLInputElement>(null);
  const languageRef = useRef<HTMLSelectElement>(null);
  const pageRef = useRef<HTMLInputElement>(null);

  const sourceRef = useRef<HTMLInputElement>(null);
  const sourceTypeRef = useRef<HTMLSelectElement>(null);
  const qualityRef = useRef<HTMLSelectElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const titleValue = titleRef.current?.value;
    const languageValue = languageRef.current?.value;
    const pageValue = pageRef.current?.value;

    api(titleValue!, languageValue!, pageValue!);
  }
  function handleSelector(element: any) {
    setItem(element);
    setIsSelected(false);
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const sourceValue = sourceRef.current?.value;
    const qualityValue = qualityRef.current?.value;
    const sourceTypeValue = sourceTypeRef.current?.value;
    const prepare = {
      ...item,
      quality: qualityValue,
      source: sourceValue,
      source_type: sourceTypeValue,
    };

    const res = await pushElementMovieRequest(prepare);
    if (res.status === 200) {
      const res = await getMoviesRequest();
      setMovies(res.data.content);
      setComponent("movies");
      setItem(null);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.left}>
          <form onSubmit={handleSubmit}>
            <h2 style={{ margin: "0" }}>Search</h2>
            <input
              type="text"
              name="title"
              id="title"
              ref={titleRef}
              placeholder="Title"
              required
            />

            <select required id="language-selector" ref={languageRef}>
              <option value="es">Spanish</option>
              <option value="en">English</option>
            </select>
            <input
              type="text"
              name="page"
              id="page"
              ref={pageRef}
              placeholder="Page"
              required
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <div className={styles.right}>
          <form onSubmit={handleSend}>
            <h2 style={{ margin: "0" }}>Quality & Source</h2>
            <select
              required
              id="quality-selector"
              disabled={isSelected}
              ref={qualityRef}
            >
              <option value="Cam">Cam</option>
              <option value="TS-HQ">TS-HQ</option>
              <option value="HD">HD</option>
              <option value="WEB-S">WEB-S</option>
            </select>
            <select
              required
              id="sourceType-selector"
              disabled={isSelected}
              ref={sourceTypeRef}
            >
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
              disabled={isSelected}
              ref={sourceRef}
            />
            <button disabled={isSelected} type="submit">
              Send
            </button>
          </form>
        </div>
        <div>
          {!item ? (
            ""
          ) : (
            <div className={styles.extra}>
              <div className={styles.result}>
                <h3>{item.title}</h3>
                <h3>{item.name}</h3>
                <h3 style={{ color: "#cccccc" }}>{item.media_type}</h3>
                <p>{item.overview}</p>
                {!item.poster_path ? (
                  ""
                ) : (
                  <img
                    className={styles.poster}
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    draggable={false}
                  />
                )}
                {!item.backdrop_path ? (
                  ""
                ) : (
                  <img
                    className={styles.banner}
                    src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                    draggable={false}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.results}>
        {!results
          ? ""
          : results.map((e: any) => {
              return (
                <div
                  key={e.id}
                  className={styles.result}
                  onClick={() => handleSelector(e)}
                >
                  <h3>{e.title}</h3>
                  <h3>{e.name}</h3>
                  <h3 style={{ color: "#cccccc" }}>{e.media_type}</h3>
                  <p>{e.overview}</p>
                  <div className={styles.images}>
                    {!e.poster_path ? (
                      ""
                    ) : (
                      <img
                        className={styles.poster}
                        src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                        draggable={false}
                      />
                    )}
                    {!e.backdrop_path ? (
                      ""
                    ) : (
                      <img
                        className={styles.banner}
                        src={`https://image.tmdb.org/t/p/w500/${e.backdrop_path}`}
                        draggable={false}
                      />
                    )}
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
