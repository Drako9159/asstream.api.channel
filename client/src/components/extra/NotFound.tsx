import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h2>404 Not Found</h2>
      <Link className={styles.button} to="/" aria-label="Home Page">
        Back
      </Link>
    </div>
  );
}
