import styles from './style.css';

export default function ScoreDisplay({ score, message }) {
  return (
    <div className={styles.scoreContainer}>
      {message && <p className={styles.message}>{message}</p>}
      <p className={styles.score}>Puntaje: {score}</p>
    </div>
  );
}
