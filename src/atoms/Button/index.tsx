import { ReactNode } from "react";
import { joinClass } from "@/helpers/general";
import styles from "./styles.module.scss"

interface CustomButtonProps {
    children: ReactNode;
    className: string;
    onClick?: (e?: any) => void
    disabled?: Boolean
}

export const CustomButton = ({ children, className, onClick, disabled }: CustomButtonProps) => {
    return (
        <div className={joinClass(styles.button__wrapper, disabled ? styles.button__wrapper__disabled : "")}>
            <button
                disabled={!!disabled}
                onClick={onClick}
                className={joinClass(styles.button, className, disabled ? styles.button__disabled : "")}>
                {children}
            </button>
        </div>
    )
}