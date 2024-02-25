import React from 'react';
import styles from './OfflineFallback.module.scss';

const OfflineFallback: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Network Issue or Offline</h1>
      <p>Please verify your internet connection and attempt your request again.</p>
    </div>
  );
};

export default OfflineFallback;
