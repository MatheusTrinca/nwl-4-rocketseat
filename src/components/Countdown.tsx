import styles from '../styles/components/Countdown.module.css';
import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';

export function Countdown() {
  const {
    minutes,
    seconds,
    resetCountdown,
    startCountdown,
    hasFinished,
    isActive,
  } = useContext(CountdownContext);

  const [minutesLeft, minutesRight] = String(minutes)
    .padStart(2, '0')
    .split('');
  const [secondsLeft, secondsRight] = String(seconds)
    .padStart(2, '0')
    .split('');

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minutesLeft}</span>
          <span>{minutesRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado
          <img src="icons/check-circle-solid.svg" alt="Checked" />
        </button>
      ) : isActive ? (
        <button
          onClick={resetCountdown}
          className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
          type="button"
        >
          Abandonar ciclo
        </button>
      ) : (
        <button
          onClick={startCountdown}
          className={styles.countdownButton}
          type="button"
        >
          Inicie um ciclo
        </button>
      )}
    </div>
  );
}
