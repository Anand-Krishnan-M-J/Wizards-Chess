import { ReactNode } from "react";
import { joinClass } from "@/helpers/general";
import styles from "./styles.module.scss"

interface CustomButtonProps {
    children: ReactNode;
    className: string;
}

export const CustomButton = ({ children, className }: CustomButtonProps) => {
    return (
        <button className={joinClass(styles.button, className)}>
            {children}
        </button>)
}