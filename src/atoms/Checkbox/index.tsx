// CheckboxComponent.tsx

import React from 'react';
import { Tooltip } from '../Tooltip';
import Image from 'next/image';
import info from "../../assets/info.png"
import styles from "./styles.module.scss"

interface CheckboxComponentProps {
    label: string;
    isChecked: boolean;
    toolTipText: string,
    handleCheckboxChange: () => void;
}

export const CheckboxComponent: React.FC<CheckboxComponentProps> = ({
    label,
    isChecked,
    toolTipText,
    handleCheckboxChange

}) => {
    return (
        <div className={styles.checkbox__wrapper}>
            <input
            id="chooseGameType"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className={styles.checkbox__input}
            />
            <label htmlFor="chooseGameType" className={styles.checkbox__label}>
                {label}
            </label>
            <Tooltip text={toolTipText}>
                <Image src={info} width={30} alt='information' />
            </Tooltip>
        </div>
    );
};
