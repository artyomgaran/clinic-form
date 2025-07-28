import { useState } from "react";
import styles from "./form-page.module.css";

export const FormPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [problem, setProblem] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    if (!name || !phone) {
      setMessage("Пожалуйста, заполните обязательные поля");
      return;
    }

    try {
      const response = await fetch("http://localhost:3040/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, problem }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке формы");
      }

      setMessage("Заявка успешно отправлена!");
      setName("");
      setPhone("");
      setProblem("");
      setIsSending(false);
    } catch (e) {
      setMessage("Ошибка: не удалось отправить заявку.");
      console.log(e, message);
    }
  };

  return (
    <div className={styles.formPage}>
      <h2>Запись к врачу</h2>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.form}>
          <span>ФИО</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.form}>
          <span>Номер телефона</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className={styles.form}>
          <span>Опишите проблему</span>
          <textarea
            className={styles.problem}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isSending}>
          Отправить
        </button>
        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
};
