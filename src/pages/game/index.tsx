import React from 'react'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { CheckerBoard } from '../../organisms/CheckerBoard'
import { Lights } from '../../organisms/Lights'
import { PieceRenderer } from '../../organisms/PieceRenderer'

import { Provider } from 'react-redux'
import { Analytics } from '@vercel/analytics/react'
import { store } from '../../store/index'

const App: React.FC = () => {
    return (
        <Provider store={store}>

            <div className="App">
                <Canvas
                    camera={{ fov: 40, position: [0, 330, 380] }}
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
