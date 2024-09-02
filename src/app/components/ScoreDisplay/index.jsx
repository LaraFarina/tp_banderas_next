"use client";
import styles from './style.css';

export default function ScoreDisplay({ score, message, timer }) {
  return (
    <div className={styles.scoreContainer}>
      {message && <p className={styles.message}>{message}</p>}
      <p className={styles.score}>Puntaje: {score}</p>
      <p className={styles.timer}>Tiempo restante: {timer}s</p>
    </div>
  );
}
