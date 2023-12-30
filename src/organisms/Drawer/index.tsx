// SideDrawer.tsx
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { messages } from '@/constants/messages';
import { CustomInputField } from '@/atoms/InputField';
import Link from 'next/link';
import { CustomButton } from '@/atoms/Button';
import { CheckboxComponent } from '@/atoms/Checkbox';
import { CustomHr } from '@/atoms';
import close from "../../assets/close.png"
import styles from './styles.module.scss';

interface SideDrawerProps {
    isDrawerOpen: boolean,
    setIsDrawerOpen: (isDrawerOpen: boolean) => void
}
export const SideDrawer = ({ isDrawerOpen, setIsDrawerOpen }: SideDrawerProps) => {
    //states
    const [isChecked, setChecked] = useState(false);

    //refs
    const drawerRef = useRef<HTMLDivElement>(null);

    //lifecycles
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleOutsideClick = (e: MouseEvent) => {
        if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
            setIsDrawerOpen(false);
        }
    };

    const handleCheckboxChange = () => {
        setChecked(!isChecked);
    };

    return (
        <div ref={drawerRef} className={`${styles['side-drawer']} ${isDrawerOpen ? styles.open : ''}`}>
            <CustomHr />
            <Image src={close} alt="close" width={30} className={styles['toggle-button']} onClick={toggleDrawer} />
            <div className={styles.drawer__content}>
                <h3 className={styles.drawer__title}>
                    {messages.register}
                </h3>
                <div className={styles.drawer__sub__content}>
                    <CheckboxComponent
                        label={messages.startNewGame}
                        isChecked={isChecked}
                        handleCheckboxChange={handleCheckboxChange}
                        toolTipText={messages.startNewGameInfo}
                    />
                    <CustomInputField label={messages.name} placeholder={messages.namePlaceHolder} toolTipText={messages.nameInfo} />
                    <CustomInputField label={messages.gameCode} placeholder={messages.gameCodePlaceholder} toolTipText={messages.gameCodeInfo} />
                    <CustomButton className={styles.drawer__start__button}>
                        <Link href="/game" className={styles.drawer__start__link}>
                            {messages.startGame}
                        </Link>
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};
