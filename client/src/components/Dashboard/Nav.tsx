import styles from "./Nav.module.css";
import iconMenu from "../../assets/icons/dashboard/menu.svg";
import { useState } from "react";
import { useDashboardStore } from "../../store/dashboard";

export default function Nav({ title, setComponent }: { title: string, setComponent: any }) {
  const [activeButton, setActiveButton] = useState<boolean>(false);
  const [navIn, setNavIn] = useState<any>(null);
  const logout = useDashboardStore((state) => state.logout);

  function handleClick() {
    setActiveButton(!activeButton);

    if (activeButton) {
      setNavIn(styles.navIn);
    } else {
      setNavIn(styles.navOut);
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.nav}>
        <div className={styles.actions} onClick={() => handleClick()}>
          <img src={iconMenu} />
        </div>
        <nav className={`${styles.navOut} ${navIn}`}>
          <ul>
            <li onClick={logout}>Logout</li>
            <li onClick={() => setComponent("movies")}>Movies</li>
          
            <li onClick={() => setComponent("search")}>Push Movie</li>
            <li onClick={() => setComponent("iptv-list")}>IPTV</li>
            <li onClick={() => setComponent("push-iptv")}>Push IPTV</li>
            <li onClick={() => setComponent("push-category")}>Push Category</li>
            <li onClick={() => setComponent("push-entry")}>Push Entry</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
