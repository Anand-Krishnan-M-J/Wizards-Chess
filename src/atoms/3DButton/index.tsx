import { joinClass } from "@/helpers/general"
import Image from "next/image"
import game from "../../assets/navigation/start.png"
import styles from "./styles.module.scss"
interface Button3DProps {
    mainText: string,
    toggleText: string
}

export const Button3D = ({ mainText, toggleText }: Button3DProps) => (
    <figure className={styles.button__container}>
        <div className={styles.button__content}>
            <span
                className={joinClass(styles.span, styles.span__1)}>
                {mainText}
            </span>
            <span
                className={joinClass(styles.span, styles.span__2)}>
                {toggleText}
            </span>
        </div>
    </figure>
)
