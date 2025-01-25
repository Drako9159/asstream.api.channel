import { createCategory } from "../../api/category";
import styles from "./PushCategory.module.css";
import { useRef } from "react";

export default function PushCategory({ setComponent }: { setComponent: any }) {
  const nameRef = useRef<HTMLInputElement>(null);

  function handleClick() {}

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const nameValue = nameRef.current?.value as string;
    const response = await createCategory(nameValue);

    if (response.status === 201) {
      setComponent("movies");
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
              name="name"
              id="name"
              placeholder="Name"
              required
              ref={nameRef}
            />

            <div style={{ display: "flex", gap: "5px" }}>
              <button type="submit">Save</button>
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
