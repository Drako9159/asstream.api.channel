import { useEffect, useState } from "react";
import { getOneIptvRequest } from "../api/iptvs";
import { useParams } from "react-router-dom";
import CardWatcherIptv from "../components/Watcher/CardWatcherIptv";

export default function WatcherIptv() {
  const [iptv, setIptv] = useState<any>({});
  const routeParams = useParams();

  useEffect(() => {
    async function api() {
      const res = await getOneIptvRequest(`${routeParams.id}`);
      setIptv(res.data.content);
    }
    api();
  }, []);

  return (
    <div>{!iptv.id ? "No content" : <CardWatcherIptv movie={iptv} />}</div>
  );
}
