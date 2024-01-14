import { useEffect, useState } from "react";
import { deleteMovieRequest, getMoviesRequest } from "../../api/movies";
import { useMoviesStore } from "../../store/movies";
import styles from "./CategoryList.module.css";
import UpdateMovie from "../Search/UpdateMovie";
import { deleteCategory, getAllCategory } from "../../api/category";
import UpdateCategory from "../Search/UpdateCategory";
import { useCategoryStore } from "../../store/category";

export default function CategoryList() {
  const setCategories = useCategoryStore((state) => state.setCategoryStore);

  const categories = useCategoryStore((state) => state.categories);

  const [item, setItem] = useState<any>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  useEffect(() => {
    async function api() {
      const response = await getAllCategory();
      setCategories(response.data);
    }
    api();
  }, []);

  async function handleDelete(id: string) {
    //const res = await deleteMovieRequest(id);
    const res = await deleteCategory(id);
    console.log(res)
    if (res.status === 204) {
      
      setCategories(categories.filter((e: any) => e._id !== id));
    }
  }

  function handleUpdate(id: string, element: any) {
    setItem({ id: id, element: element });
    setIsUpdate(true);
  }

  return (
    <div className={styles.container}>
      {!categories
        ? "No content"
        : categories.map((e: any) => {
            return (
              <div className={styles.card} key={e.id}>
                <p>Name: {e.name}</p>
                <p>Id: {e._id}</p>
                <p>Entries:</p>
                {e.entries.map((e: any) => {
                  return <p style={{ color: "#000000" }}>{e}</p>;
                })}

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
        <UpdateCategory
          id={item.id}
          element={item.element}
          setIsUpdate={setIsUpdate}
        />
      )}
    </div>
  );
}
