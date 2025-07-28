import { useEffect, useState } from "react";

import styles from "./bids-page.module.css";

export const BidsPage = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await fetch("http://localhost:3040/bids", {
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Отказано в доступе. Вы не авторизованы");
          } else {
            throw new Error("Ошибка сервера");
          }
        }

        const data = await response.json();
        setBids(data);
      } catch (e) {
        setError(e.message); // <- покажем пользователю
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, []);

  return (
    <div className={styles.bidsPage}>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <h2>Заявки</h2>
          {loading ? (
            <p>Загрузка...</p>
          ) : bids.length === 0 ? (
            <p>Нет заявок</p>
          ) : (
            <div className={styles.tableWrapper}>
              <table className={styles.bidsTable}>
                <thead>
                  <tr>
                    <th>ФИО</th>
                    <th>Телефон</th>
                    <th>Проблема</th>
                    <th>Дата</th>
                  </tr>
                </thead>
                <tbody>
                  {bids.map((bid) => (
                    <tr key={bid._id}>
                      <td>{bid.name}</td>
                      <td>{bid.phone}</td>
                      <td>{bid.problem || "Не указано"}</td>
                      <td>{new Date(bid.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};
