import styles from "./Layout.module.css";

export default function Layout({ children }: any) {
  return <div className={styles.container}>{children}</div>;
}
