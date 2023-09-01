import React from 'react'
import type * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { type GLTF } from 'three-stdlib'
import { useSpring, animated } from '@react-spring/three'
import { type PieceProps } from '../type'

type GLTFResult = GLTF & {
    nodes: {
        queen1: THREE.Mesh
    }
    materials: {
        ['Material.003']: THREE.MeshStandardMaterial
    }
}

export const BlackQueen: React.FC<PieceProps> = (props) => {
    const { nodes, materials } = useGLTF(
        '/Black/queen-transformed.glb'
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
                position={[0, 5, 0]}
                geometry={nodes.queen1.geometry}
                material={materials['Material.003']}
            />
        </animated.group>
    )
}

useGLTF.preload('/Black/queen-transformed.glb')
