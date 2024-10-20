import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import wand from "../../assets/wand.png"
import styles from './styles.module.scss'

const RoundCursor: React.FC = () => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
    const [isCursorVisible, setIsCursorVisible] = useState(true)

    useEffect(() => {
        const updateCursorPosition = (e: MouseEvent) => {
            setCursorPosition({ x: e.clientX, y: e.clientY })
            setIsCursorVisible(true)
        }

        const handleMouseLeave = () => {
            setIsCursorVisible(false)
        }

        const handleMouseEnter = () => {
            setIsCursorVisible(true)
        }

        // Listen for mouse events on the document
        document.addEventListener('mousemove', updateCursorPosition)
        document.addEventListener('mouseleave', handleMouseLeave)
        document.addEventListener('mouseenter', handleMouseEnter)

        return () => {
            document.removeEventListener('mousemove', updateCursorPosition)
            document.removeEventListener('mouseleave', handleMouseLeave)
            document.removeEventListener('mouseenter', handleMouseEnter)
        }
    }, [])

    return (
        <div
            className={styles['round-cursor']}
            style={{
                left: cursorPosition.x,
                top: cursorPosition.y,
                display: isCursorVisible ? 'block' : 'none',
            }}
        >
            <Image alt="wand" src={wand} height={150} width={150} />
        </div>
    )
}

export default RoundCursor
