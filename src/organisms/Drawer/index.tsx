// SideDrawer.tsx
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { messages } from '@/constants/messages';
import { CustomInputField } from '@/atoms/InputField';
import { CustomHr } from '@/atoms';
import close from "../../assets/close.png"
import styles from './styles.module.scss';

interface SideDrawerProps {
    isDrawerOpen: boolean,
    setIsDrawerOpen: (isDrawerOpen: boolean) => void
}
export const SideDrawer = ({ isDrawerOpen, setIsDrawerOpen }: SideDrawerProps) => {
    const drawerRef = useRef<HTMLDivElement>(null);
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleOutsideClick = (e: MouseEvent) => {
        if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
            setIsDrawerOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div ref={drawerRef} className={`${styles['side-drawer']} ${isDrawerOpen ? styles.open : ''}`}>
            <CustomHr />
            <Image src={close} alt="close" width={30} className={styles['toggle-button']} onClick={toggleDrawer} />
            <div className={styles.drawer__content}>
                <h3 className={styles.drawer__title}>
                    {messages.register}
                </h3>
                <div className={styles.drawer__sub__content}>
                    <CustomInputField label={messages.name} placeholder={messages.namePlaceHolder} toolTipText={messages.nameInfo} />
                </div>
            </div>
        </div>
    );
};
