import React from 'react'
import type * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { type GLTF } from 'three-stdlib'
import { useSpring, animated } from '@react-spring/three'
import { type PieceProps } from '../type'

type GLTFResult = GLTF & {
    nodes: {
        pawn2: THREE.Mesh
    }
    materials: {
        ['Material.001']: THREE.MeshStandardMaterial
    }
}

export const WhitePawn: React.FC<PieceProps> = (props) => {
    const { nodes, materials } = useGLTF(
        '/White/pawn-transformed.glb'
    ) as GLTFResult
    const animationProps = useSpring({
        position: props.position,
        config: { duration: 1000 }, // Animation duration in milliseconds
    })

    return (
        <animated.group
            {...animationProps}
            dispose={null}
            rotation={[0, Math.PI, 0]}
            onClick={props.onClick}
        >
            <mesh
                geometry={nodes.pawn2.geometry}
                material={materials['Material.001']}
                position={[-58.618, 2.147, -1.07]}
            />
        </animated.group>
    )
}

useGLTF.preload('/White/pawn-transformed.glb')
