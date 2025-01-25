import { useDashboardStore } from "../../store/dashboard";
import { dashboardLoginRequest } from "../../api/auth";
import styles from "./ModalLogin.module.css";

export default function ModalLogin() {
  const setToken = useDashboardStore((state) => state.setToken);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = (e.currentTarget[0] as HTMLInputElement).value;
    const password = (e.currentTarget[1] as HTMLInputElement).value;
    if (!email || !password) return alert("Please fill all fields");
    try {
      await dashboardLoginRequest(email, password).then((res) => {
        setToken(res.headers.authorization);
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className={styles.container}>
      <h2>Please Login</h2>
      <form className={styles.form} onSubmit={handleLogin}>
        <input type="text" placeholder="Email" name="email" id="email" />

        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
