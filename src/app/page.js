"use client";
import { useEffect, useState } from 'react';
import FlagDisplay from './components/FlagDisplay';
import GuessInput from './components/GuessInput';
import ScoreDisplay from './components/ScoreDisplay';
import styles from './page.module.css';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");

  const urlApi = "https://countriesnow.space/api/v0.1/countries/flag/images";

  useEffect(() => {
    fetch(urlApi)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.data);
        selectRandomCountry(data.data);
      })
      .catch((error) => console.log("Hubo un error: " + error));
  }, []);

  const selectRandomCountry = (countriesList) => {
    const randomIndex = Math.floor(Math.random() * countriesList.length);
    setSelectedCountry(countriesList[randomIndex]);
  };

  const handleGuess = () => {
    if (guess.toLowerCase() === selectedCountry.name.toLowerCase()) {
      setScore(score + 10);
      setMessage("Correcto! Has ganado 10 puntos.");
    } else {
      setScore(score - 1);
      setMessage("Incorrecto! Has perdido 1 punto.");
    }
    setGuess("");
    selectRandomCountry(countries);
  };

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1>Adivina el País</h1>
        {selectedCountry && (
          <FlagDisplay
            flagUrl={selectedCountry.flag}
            countryName={selectedCountry.name}
          />
        )}
        <GuessInput guess={guess} setGuess={setGuess} handleGuess={handleGuess} />
        <ScoreDisplay score={score} message={message} />
      </div>
    </main>
  );
}
