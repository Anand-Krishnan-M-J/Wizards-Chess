// FadeInText.tsx

import React from 'react';
import styles from './styles.module.scss'; // Import the SCSS file for styling
import { joinClass } from '@/helpers/general';

interface FadeInTextProps {
    text: string;
    className?: string;
}

export const FadeInText: React.FC<FadeInTextProps> = ({ text, className }) => {
    return (
        <div className={styles["fade-in-text"]}>
            {text.split('').map((char, index) => (
                <span key={index} className={className ? className : styles["fade-in-char"]}>
                    {char === " " ? <span>&nbsp;&nbsp;</span> : char}
                </span>
            ))}
        </div>
    );
};
