import React, { useContext, useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'
import { useDispatch } from 'react-redux'
import { messages } from '@/constants/messages'
import { BoardAndPieces } from '@/organisms/BoardAndPieces'
import LandscapeEnforcer from '@/organisms/Orientation'
import { Canvas } from '@react-three/fiber'
import { usePieceColorFromSessionStorage } from '@/hooks/useIsBlackPiece'
import { DrawerContext, DrawerContextProps } from '../_app'
import styles from './styles.module.scss'
import { isMobileDevice, joinClass } from '@/helpers/general'
import RotatingSparkle from '@/organisms/Sparkle'
import { intialState, updateState } from '@/store/pieces'

const App: React.FC = () => {
    const context = useContext<DrawerContextProps | undefined>(DrawerContext)
    const { isBlackPieces } = usePieceColorFromSessionStorage()
    const dispatch = useDispatch()

    useEffect(() => {
        context?.setEnableVideoDrawer(true)
        context?.toggleDrawerOpen(false)
        return () => {
            dispatch(updateState(intialState))
        }
    }, [])

    return (
        <div className="App">
            <div className={styles.begin__text__container}>
                <p className={styles.beginText}>{messages.letTheGameBegin}</p>
                <span className={styles.sparkle} />
            </div>
            <Canvas
                camera={{
                    fov: 42,
                    position: isMobileDevice()
                        ? [0, 500, isBlackPieces ? -320 : 320]
                        : [0, 420, isBlackPieces ? -350 : 350],
                }}
                className={joinClass('main_canvas', styles.canvas__bg)}
                style={{
                    width: '100vw',
                    height: '100vh',
                }}
            >
                <ambientLight intensity={-0.1} />
                <pointLight position={[1, 1, 1]} />
                <RotatingSparkle />
                <OrbitControls />
                <BoardAndPieces />
            </Canvas>
            <LandscapeEnforcer />
        </div>
    )
}

export default App
