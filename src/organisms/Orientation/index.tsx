import React, { useEffect, useState } from 'react'
import rotatePhone from '../../assets/rotate.gif'
import Image from 'next/image'

const LandscapeEnforcer: React.FC = () => {
    const [isPortrait, setIsPortrait] = useState(false)

    useEffect(() => {
        const handleOrientationChange = () => {
            // Check if the current orientation is portrait
            if (window.innerHeight > window.innerWidth) {
                setIsPortrait(true)
            } else {
                setIsPortrait(false)
            }
        }

        handleOrientationChange()

        window.addEventListener('resize', handleOrientationChange)

        return () => {
            window.removeEventListener('resize', handleOrientationChange)
        }
    }, [])

    const landscapeEnforcerStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        display: isPortrait ? 'flex' : 'none',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    }

    const messageStyle: React.CSSProperties = {
        color: '#fff',
        fontSize: '18px',
        textAlign: 'center',
    }

    return (
        <div style={landscapeEnforcerStyle}>
            <div style={messageStyle}>
                Please rotate your device to landscape mode to play the game.
            </div>
            <Image
                src={rotatePhone}
                width={100}
                height={100}
                alt="Rotate Phone"
            />
        </div>
    )
}

export default LandscapeEnforcer
