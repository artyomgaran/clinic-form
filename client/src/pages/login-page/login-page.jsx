import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login-page.module.css";
export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3040/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      navigate("/bids");
    } else {
      setError(data.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <div className={styles.inputBox}>
          <label htmlFor="username">Почта</label>
          <input
            type="email"
            id="username"
            name="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputBox}>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Войти</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};
