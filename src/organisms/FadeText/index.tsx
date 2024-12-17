// FadeInText.tsx

import React from 'react';
import { joinClass } from '@/helpers/general';
import styles from './styles.module.scss'; // Import the SCSS file for styling

interface FadeInTextProps {
  text: string;
  className?: string;
  variant: 'title' | 'description';
}

export const FadeInText: React.FC<FadeInTextProps> = ({ text, className, variant }) => {
  return (
    <div className={joinClass(styles['fade-in-text'], styles[`fade-in-text--${variant}`])}>
      {text.split('').map((char, index) => (
        <span key={index} className={className ? className : styles['fade-in-char']}>
          {char === ' ' ? <span>&nbsp;&nbsp;</span> : char}
        </span>
      ))}
    </div>
  );
};
