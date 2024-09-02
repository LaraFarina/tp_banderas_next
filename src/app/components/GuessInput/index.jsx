import styles from './style.css';

export default function GuessInput({ guess, setGuess, handleGuess }) {
  return (
    <div className={styles.inputContainer}>
    <input type="text" value={guess} placeholder="Ingresa el nombre del país" name="text" class="input"></input>
      <button onClick={handleGuess} className={styles.button}>
        Adivinar
      </button>
    </div>
  );
}
