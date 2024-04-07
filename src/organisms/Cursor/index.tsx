import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import wand from "../../assets/wand.png"
import styles from './styles.module.scss'

const RoundCursor: React.FC = () => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const updateCursorPosition = (e: MouseEvent) => {
            setCursorPosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener('mousemove', updateCursorPosition)

        return () => {
            window.removeEventListener('mousemove', updateCursorPosition)
        }
    }, [])

    return (
        <div
            className={styles['round-cursor']}
            style={{ left: cursorPosition.x, top: cursorPosition.y }}
        >
            <Image alt="" src={wand} height={150} width={150} />
        </div>
    )
}

export default RoundCursor
