import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import { ChallengesContext } from './ChallengesContext';

let countdownTimeout;

interface CountdownProviderProps {
  children: ReactNode;
}

interface CountDownContextData {
  minutes: number;
  seconds: number;
  startCountdown: () => void;
  resetCountdown: () => void;
  isActive: boolean;
  hasFinished: boolean;
}

export const CountdownContext = createContext({} as CountDownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setHasFinished(false);
    setTime(0.1 * 60);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        startCountdown,
        resetCountdown,
        isActive,
        hasFinished,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
