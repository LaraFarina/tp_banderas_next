import styles from './style.css';

export default function GuessInput({ guess, setGuess, handleGuess }) {
  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Ingresa el nombre del país"
        className={styles.input}
      />
      <button onClick={handleGuess} className={styles.button}>
        Adivinar
      </button>
    </div>
  );
}
