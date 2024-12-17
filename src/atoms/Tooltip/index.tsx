import React, { ReactNode, useState } from 'react';
import styles from './styles.module.scss';

interface TooltipProps {
  text: string;
  children: ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isActive, setIsActive] = useState(false);

  const handleMouseEnter = () => {
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };

  return (
    <div
      className={styles['tooltip-container']}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div className={`${styles.tooltip} ${isActive ? styles.active : ''}`}>{text}</div>
    </div>
  );
};
