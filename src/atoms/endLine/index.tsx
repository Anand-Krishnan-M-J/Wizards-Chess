import React from "react";
import endLine from "../../assets/endLine.png"
import styles from "./styles.module.scss";
import Image from "next/image";

export const CustomEndLine = () => (
    <div className={styles.endLine}>
        <Image width={800} className={styles.endLine__image} alt={"endLine"} src={endLine} />
    </div>
)
