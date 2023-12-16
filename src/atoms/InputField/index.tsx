// CustomInputField.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import info from "../../assets/info.png"
import styles from './styles.module.scss';
import { Tooltip } from '../Tooltip';

interface CustomInputFieldProps {
    label: string;
    placeholder: string;
    toolTipText?: string;
}

export const CustomInputField: React.FC<CustomInputFieldProps> = ({ label, placeholder, toolTipText }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <div className={styles.custom__input__container}>
            <label className={styles.custom__input__label}>{label}</label>
            <div className={styles.custom__input__wrapper}>
                <input
                    type="text"
                    className={styles.custom__input}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleInputChange}
                />
                {
                    toolTipText &&
                    <Tooltip text={toolTipText}><Image src={info} width={30} alt='information' /></Tooltip>
                }
            </div>
        </div>
    );
};
