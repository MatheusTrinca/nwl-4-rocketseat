import styles from '../styles/components/Profile.module.css';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { useContext } from 'react';

export function Profile() {
  const { level } = useContext(ChallengesContext);
  return (
    <div className={styles.profileContainer}>
      <div>
        <img src="icons/JohnDoeOldAvatar.png" alt="John Doe" />
      </div>
      <div>
        <strong>John Doe</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          {level}
        </p>
      </div>
    </div>
  );
}
