
import styles from "./UpdateCategory.module.css";
import { useRef } from "react";
import { getAllCategory, updateCategory } from "../../api/category";
import { useCategoryStore } from "../../store/category";

export default function UpdateCategory({
  id,
  element,
  setIsUpdate,
}: {
  id: string;
  element: any;
  setIsUpdate: any;
}) {
  const setCategories = useCategoryStore((state) => state.setCategoryStore);

  const nameRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    setIsUpdate(false);
  }

  async function api() {
    const res = await getAllCategory();
    setCategories(res.data);
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const nameValue = nameRef.current?.value as string;
    const idValue = idRef.current?.value as string;

    const res = await updateCategory(idValue, nameValue);

    if (res.status === 200) {
      api();
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.right}>
          <form onSubmit={handleSend}>
            <h2 style={{ margin: "0" }}>Category</h2>

            <input
              type="text"
              name="id"
              id="id"
              placeholder="Id"
              required
              ref={idRef}
              value={element._id}
              hidden={true}
            />

            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              required
              ref={nameRef}
              defaultValue={element.name}
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
      </div>
    </div>
  );
}
