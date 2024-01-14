import { pushElementIpTvRequest } from "../../api/search";
import { useIptvStore } from "../../store/iptv";
import styles from "./UploadIptv.module.css";
import { useRef } from "react";

export default function UploadIptv({ setComponent}: { setComponent: any}) {
  const setIptvStore = useIptvStore((state) => state.setIptvStore);
  
  const sourceRef = useRef<HTMLInputElement>(null);
  const sourceTypeRef = useRef<HTMLSelectElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const posterRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);

  function handleClick() {}

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const sourceValue = sourceRef.current?.value;
    const sourceTypeValue = sourceTypeRef.current?.value;
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
      source_type: sourceTypeValue,
    };

    const res = await pushElementIpTvRequest(prepare);
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
            <h2 style={{ margin: "0" }}>IPTV</h2>

            <select required id="sourceType-selector" ref={sourceTypeRef}>
              <option value="video/mp4">mp4</option>
              <option value="video/webm">webm</option>
              <option value="video/x-matroska">mkv</option>
              <option value="video/mp2t">ts</option>
              <option value="application/x-mpegURL">ts-m3u8</option>
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
