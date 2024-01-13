import React, { useContext, useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Provider } from 'react-redux'
import { Canvas } from '@react-three/fiber'
import { usePieceColorFromSessionStorage } from '@/hooks/useIsBlackPiece'
import { CheckerBoard } from '../../organisms/CheckerBoard'
import { Lights } from '../../organisms/Lights'
import { PieceRenderer } from '../../organisms/PieceRenderer'
import { store } from '../../store/index'
import { DrawerContext, DrawerContextProps } from '../_app'

const App: React.FC = () => {
    const context = useContext<DrawerContextProps | undefined>(DrawerContext);
    const {isBlackPieces} = usePieceColorFromSessionStorage();

    useEffect(() => {
        context?.toggleDrawerOpen(false)
    }, [])

    return (
        <Provider store={store}>
            <div className="App">
                <Canvas
                    camera={{ fov: 40, position: [0, 330, isBlackPieces ? -380 : 380] }}
                    className="main_canvas"
                    style={{
                        width: '100vw',
                        height: '100vh',
                    }}
                >
                    <OrbitControls />
                    <group>
                        <Lights />
                        <PieceRenderer />
                        <CheckerBoard />
                    </group>
                </Canvas>
            </div>
        </Provider>
    )
}

export default App
