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
  const [timer, setTimer] = useState(15); // Estado del temporizador

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

  useEffect(() => {
    if (selectedCountry) {
      // Reiniciar el temporizador cuando cambia la bandera
      setTimer(15);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (timer <= 0) {
      // Cuando el temporizador llega a 0, seleccionar una nueva bandera y restar un punto
      setScore((prevScore) => prevScore - 1);
      setMessage("Tiempo agotado! Has perdido 1 punto.");
      selectRandomCountry(countries);
      return; // Para evitar la configuración de un nuevo intervalo
    }
    
    // Configurar el intervalo para contar hacia abajo
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Limpiar el intervalo cuando el componente se desmonte o el temporizador se reinicie
    return () => clearInterval(intervalId);
  }, [timer, countries]);

  const selectRandomCountry = (countriesList) => {
    const randomIndex = Math.floor(Math.random() * countriesList.length);
    setSelectedCountry(countriesList[randomIndex]);
  };

  const handleGuess = () => {
    if (guess.toLowerCase() === selectedCountry.name.toLowerCase()) {
      setScore((prevScore) => prevScore + 10);
      setMessage("Correcto! Has ganado 10 puntos.");
    } else {
      setScore((prevScore) => prevScore - 1);
      setMessage("Incorrecto! Has perdido 1 punto.");
    }
    setGuess("");
    selectRandomCountry(countries);
  };

  return (
    <main className={styles.main}>
      <ScoreDisplay score={score} message={message} timer={timer} />
      <div className={styles.center}>
        <h1 className={styles.title}>Adivina el País</h1>
        {selectedCountry && (
          <FlagDisplay
            flagUrl={selectedCountry.flag}
            countryName={selectedCountry.name}
          />
        )}
        <GuessInput guess={guess} setGuess={setGuess} handleGuess={handleGuess} />
      </div>
    </main>
  );
}
