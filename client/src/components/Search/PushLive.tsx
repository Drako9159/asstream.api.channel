import { getAllCategory } from "../../api/category";
import { pushElementIpTvRequest, pushLive } from "../../api/search";
import { useIptvStore } from "../../store/iptv";
import styles from "./UploadIptv.module.css";
import { useEffect, useRef, useState } from "react";

export default function PushLive({ setComponent }: { setComponent: any }) {
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    async function getAllCategories() {
      const response = await getAllCategory();
      setCategories(response.data);
    }
    getAllCategories();
  }, []);

  const setIptvStore = useIptvStore((state) => state.setIptvStore);

  const sourceRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const posterRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);

  function handleClick() {}

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const sourceValue = sourceRef.current?.value;
    const categoryValue = categoryRef.current?.value;
    const titleValue = titleRef.current?.value;
    const descriptionValue = descriptionRef.current?.value;
    const posterValue = posterRef.current?.value;
    const bannerValue = bannerRef.current?.value;

    const prepare = {
      poster_path: posterValue,
      backdrop_path: bannerValue,
      title: titleValue,
      overview: descriptionValue,
      source: sourceValue,
      categoryId: categoryValue,
    };

    const res = await pushLive(prepare);
    if (res.status === 200) {
      setIptvStore(res.data.content);
      setComponent("iptv-list");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.right}>
          <form onSubmit={handleSend}>
            <h2 style={{ margin: "0" }}>LIVE</h2>

            <select required id="category-selector" ref={categoryRef}>
              {categories.map((e: any) => {
                return <option value={e._id}>{e.name}</option>;
              })}
            </select>

            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              required
              ref={titleRef}
            />
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              required
              ref={descriptionRef}
            />
            <input
              type="text"
              name="image_poster"
              id="image_poster"
              placeholder="Poster"
              required
              ref={posterRef}
            />
            <input
              type="text"
              name="image_banner"
              id="image_banner"
              placeholder="Banner"
              required
              ref={bannerRef}
            />

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
      </div>
    </div>
  );
}
