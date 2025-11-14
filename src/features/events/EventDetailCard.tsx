import React from 'react';
import Button from '../../components/Button/Button';
import styles from './EventDetailCard.module.css';

// Example image URL
const eventImageUrl = 'https://images.unsplash.com/photo-1519671482722-4fa523b9b9b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDEwfHxwYXJ0eSUyMGNvbmNlcnR8ZW58MHx8fHwxNzMwNzQwNzM5fDA&ixlib=rb-4.0.3&q=80&w=400';

const EventDetailCard: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.logo}>LetsMeet</div>
      <div className={styles.card}>
        <img src={eventImageUrl} alt="David's Game Night" className={styles.headerImage} />
        <div className={styles.content}>
          <h2 className={styles.title}>David's Game Night</h2>
          <p className={styles.detail}>19/10/2025, 2:00 AM</p>
          <p className={styles.detail}>David's House</p>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore.
          </p>
        </div>
        <div className={styles.footer}>
          <Button variant="link">Decline</Button>
          <Button variant="primary">R.S.V.P</Button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailCard;