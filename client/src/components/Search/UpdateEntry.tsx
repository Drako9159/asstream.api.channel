import { useEffect, useRef, useState } from "react";
import styles from "./Search.module.css";
import { getMoviesRequest } from "../../api/movies";
import { useEntryStore } from "../../store/entry";
import { getAllCategory } from "../../api/category";
import { updateEntry } from "../../api/entry";

// interface UpdateMovieProps {
//   setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
// }

export default function UpdateEntry({
  element,
  setIsUpdate,
}: {
  element: any;
  setIsUpdate: any;
}) {
  const [categories, setCategories] = useState<any>([]);
  const [currentSource, setCurrentSource] = useState<string>("");
 
  useEffect(() => {
    setCurrentSource(element.content.videos.url);
    console.log(element.content.videos.quality);
  }, [element]);

  useEffect(() => {
    async function getAllCategories() {
      const response = await getAllCategory();
      setCategories(response.data);
    }
    getAllCategories();
  }, []);

 

  const setEntries = useEntryStore((state) => state.setEntryStore);

  const sourceRef = useRef<HTMLInputElement>(null);
  const qualityRef = useRef<HTMLSelectElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  async function api() {
    const res = await getMoviesRequest();
    setEntries(res.data.content);
  }

  function handleClick() {
    setIsUpdate(false);
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const sourceValue = sourceRef.current?.value;
    const qualityValue = qualityRef.current?.value;
    const categoryValue = categoryRef.current?.value;
    const statusValue = statusRef.current?.value;

    const prepare = {
      ...element,
      quality: qualityValue,
      source: sourceValue,
      categoryIdForm: categoryValue,
      statusForm: statusValue,
    };

    //const res = await updateMovieRequest(id, prepare);
    const res = await updateEntry(prepare);
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

            <select
              required
              id="category-selector"
              ref={categoryRef}
              defaultValue={element.categoryId}
            >
              <option value={element.categoryId}>{element.categoryName}</option>
              {categories.map((e: any) => {
                return <option value={e._id}>{e.name}</option>;
              })}
            </select>

            
            <select
              required
              id="quality-selector"
              ref={qualityRef}
              defaultValue={element.content.videos.quality}
            >
              <option value="SD">SD</option>
              <option value="HD">HD</option>
              <option value="FHD">FHD</option>
            </select>

            <select
              required
              id="status-selector"
              ref={statusRef}
              defaultValue={element.status}
            >
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>

            <input
              type="text"
              name="source"
              id="source"
              placeholder="source"
              required
              ref={sourceRef}
              defaultValue={currentSource}
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
                <p>{element.shortDescription}</p>
                {!element.thumbnail ? (
                  ""
                ) : (
                  <img
                    className={styles.poster}
                    src={element.thumbnail}
                    draggable={false}
                  />
                )}
                {!element.backdrop ? (
                  ""
                ) : (
                  <img
                    className={styles.banner}
                    src={element.backdrop}
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
