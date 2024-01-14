import { useEffect, useState } from "react";
import { getIptvRequest } from "../../api/iptvs";
import { deleteIptvRequest } from "../../api/iptvs";
import styles from "./IptvList.module.css";
import UpdateIptv from "../Search/UpdateIptv";
import { useIptvStore } from "../../store/iptv";

export default function IptvList() {
  
  const setIptvStore = useIptvStore((state) => state.setIptvStore);
  const iptvs = useIptvStore((state) => state.iptvs);

  const [item, setItem] = useState<any>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  useEffect(() => {
    api();
  }, []);

  async function api() {
    const res = await getIptvRequest();
    setIptvStore(res.data.content);
  }

  async function deleteIptv(id: string) {
    const res = await deleteIptvRequest(id);
    if (res.status === 204) {
      setIptvStore(iptvs.filter((e: any) => e.id !== id));
    }
  }

  function handleUpdate(id: string, element: any) {
    setItem({ id: id, element: element });
    setIsUpdate(true);
  }

  return (
    <div className={styles.container}>
      {!iptvs
        ? "No content"
        : iptvs.map((e: any) => {
            return (
              <div className={styles.card} key={e.id}>
                <p>Title: {e.title}</p>
                <p>Id: {e.id}</p>
                <p>Source: {e.source}</p>
                <p>Source Type: {e.source_type}</p>
                <div className={styles.buttons}>
                  <button onClick={() => deleteIptv(e.id)}>Delete</button>
                  <button onClick={() => handleUpdate(e.id, e)}>Edit</button>
                </div>
              </div>
            );
          })}
      {!isUpdate || !item ? (
        ""
      ) : (
        <UpdateIptv
          id={item.id}
          element={item.element}
          setIsUpdate={setIsUpdate}
        />
      )}
    </div>
  );
}
