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
        ['Material.004']: THREE.MeshStandardMaterial
    }
}

export const BlackPawn: React.FC<PieceProps> = (props) => {
    const { nodes, materials } = useGLTF(
        '/Black/pawn-transformed.glb'
    ) as GLTFResult
    const animationProps = useSpring({
        position: props.position,
        config: { duration: 1000 }, // Animation duration in milliseconds
    })

    return (
        <animated.group
            {...animationProps}
            dispose={null}
            onClick={props.onClick}
        >
            <mesh
                geometry={nodes.pawn2.geometry}
                material={materials['Material.004']}
                position={[-57.829, 5, -1.162]}
            />
        </animated.group>
    )
}

useGLTF.preload('/Black/pawn-transformed.glb')
