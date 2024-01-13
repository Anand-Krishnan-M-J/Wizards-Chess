import { joinClass } from "@/helpers/general"
import styles from "./styles.module.scss"
interface Button3DProps {
    mainText: string,
    toggleText: string,
    onClick: () => void
}

export const Button3D = ({ mainText, toggleText, onClick }: Button3DProps) => (
    <figure className={styles.button__container} onClick={(e) => {
        e.stopPropagation()
        onClick();
    }}>
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
