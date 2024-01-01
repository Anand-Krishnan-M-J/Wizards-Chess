import React, { useState } from 'react';
import { joinClass } from '@/helpers/general';
import Image from 'next/image';
import { Tooltip } from '../Tooltip';
import info from "../../assets/info.png"
import styles from './styles.module.scss';

interface CustomInputFieldProps {
    label: string;
    placeholder: string;
    toolTipText?: string;
    disabled?: boolean;
    error?: string;
}
// eslint-disable-next-line react/display-name
export const CustomInputField = React.forwardRef<HTMLInputElement, CustomInputFieldProps>((
    { label, placeholder, toolTipText, disabled, error }, ref) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <div className={styles.custom__input__container}>
            <div className={styles.custom__input__label__wrapper}>
                <label className={styles.custom__input__label}>{label}</label>
                {
                    toolTipText &&
                    <Tooltip text={toolTipText}><Image src={info} width={20} alt='information' /></Tooltip>
                }
            </div>
            <div className={joinClass(styles.custom__input__wrapper)}>
                <input
                    ref={ref}
                    disabled={disabled}
                    type="text"
                    className={joinClass(styles.custom__input, disabled ? styles.custom__input__disabled : "")}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <p className={styles.custom__input__error}>{error}</p>
            </div>

        </div>
    );
});
