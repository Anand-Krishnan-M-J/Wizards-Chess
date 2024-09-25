import React, { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { isServer } from '@/helpers/common'
import { pieceTypeColor } from '@/store/pieces/types'
import { CheckerBoard } from '../../organisms/CheckerBoard'
import { Lights } from '../../organisms/Lights'
import { PieceRenderer } from '../../organisms/PieceRenderer'

export const BoardAndPieces: React.FC = () => {
    const groupRef = useRef<any>(null)
    const [startAnimation, setStartAnimation] = React.useState(false)
    const isBlackPieces =
        !isServer &&
        sessionStorage.getItem('pieceType') === pieceTypeColor.black

    useEffect(() => {
        if (groupRef) {
            groupRef.current.rotation.y = -Math.PI / 2
            groupRef.current.rotation.x = isBlackPieces
                ? Math.PI / 10
                : -Math.PI / 10
            setTimeout(() => {
                setStartAnimation(true)
            }, 2000)
            groupRef.current.scale.x = 1.11
            groupRef.current.scale.y = 1.11
            groupRef.current.scale.z = 1.11
        }
    }, [])
    useFrame((_state, delta) => {
        if (startAnimation) {

            if (groupRef.current.rotation.y < 0) {
                groupRef.current.rotation.y += delta * 0.85; 
            }
    
            if (!isBlackPieces && groupRef.current.rotation.x < 0) {
                groupRef.current.rotation.x += 0.3 * delta; 
            }
            if (isBlackPieces && groupRef.current.rotation.x > 0) {
                groupRef.current.rotation.x -= 0.3 * delta; 
            }
    
            if (groupRef.current.scale.x > 1) {
                const scaleSpeed = 0.3 * delta; 
                groupRef.current.scale.x -= scaleSpeed;
                groupRef.current.scale.y -= scaleSpeed;
                groupRef.current.scale.z -= scaleSpeed;
            }

            groupRef.current.scale.set(
                Math.max(1, groupRef.current.scale.x),
                Math.max(1, groupRef.current.scale.y),
                Math.max(1, groupRef.current.scale.z)
            );
        }
    });

    return (
        <group ref={groupRef}>
            <Lights />
            <PieceRenderer />
            <CheckerBoard />
        </group>
    )
}
