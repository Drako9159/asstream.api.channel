import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

import styles from "./VideoPlayer.module.css";
export default function VideoPlayer({
  source_type,
  source,
  title,
}: {
  source_type: string;
  source: string;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && document.body.contains(videoRef.current)) {
      videojs(videoRef.current, {
        playbackRates: [0.5, 1, 1.5, 2],
        buffer: {
          maxBufferLength: 30,
          highBufferLength: 10,
          bufferWhilePaused: true,
        },
      });
    }
  }, []);

  return (
    <div data-vjs-player className={styles.container}>
      <video
        id="my-video"
        ref={videoRef}
        // className="video-js vjs-default-skin"

        className={`video-js vjs-default-skin ${styles.videoPlayer}`}
        controls
        // className={styles.videoJs}
        preload="none"
        title={title}
      >
        <source src={source} type={source_type} />
      </video>
    </div>
  );
}
