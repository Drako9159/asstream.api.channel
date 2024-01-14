import { useEffect, useState } from "react";
import { deleteMovieRequest, getMoviesRequest } from "../../api/movies";
import { useMoviesStore } from "../../store/movies";
import styles from "./EntryList.module.css";
import UpdateMovie from "../Search/UpdateMovie";
import { deleteEntry, getAllEntry } from "../../api/entry";
import { useEntryStore } from "../../store/entry";
import UpdateEntry from "../Search/UpdateEntry";

export default function EntryList() {
  const setEntries = useEntryStore((state) => state.setEntryStore);
  const entries = useEntryStore((state) => state.entries);

  const [item, setItem] = useState<any>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  useEffect(() => {
    async function api() {
      const res = await getAllEntry();
      setEntries(res.data);
    }
    api();
  }, []);

  async function handleDelete(id: string) {
    const res = await deleteEntry(id);
    if (res.status === 204) {
      setEntries(entries.filter((e: any) => e._id !== id));
    }
  }

  function handleUpdate(id: string, element: any) {
    setItem({ id: id, element: element });
    setIsUpdate(true);
  }

  return (
    <div className={styles.container}>
      {!entries
        ? "No content"
        : entries.map((e: any) => {
            return (
              <div className={styles.card} key={e.id}>
                <p>Title: {e.title}</p>
                <p>Id: {e._id}</p>
                <p>status: {e.status}</p>
                
                <div className={styles.buttons}>
                  <button onClick={() => handleDelete(e._id)}>Delete</button>
                  <button onClick={() => handleUpdate(e._id, e)}>Edit</button>
                </div>
              </div>
            );
          })}
      {!isUpdate || !item ? (
        ""
      ) : (
        <UpdateEntry
          id={item.id}
          element={item.element}
          setIsUpdate={setIsUpdate}
        />
      )}
    </div>
  );
}
