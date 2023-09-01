import React from 'react'
import type * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import { type GLTF } from 'three-stdlib'
import { type PieceProps } from '../type'

type GLTFResult = GLTF & {
    nodes: {
        knight2: THREE.Mesh
    }
    materials: {
        ['Material.005']: THREE.MeshStandardMaterial
    }
}

export const BlackKnight: React.FC<PieceProps> = (props) => {
    const { nodes, materials } = useGLTF(
        '/Black/knight-transformed.glb'
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
                geometry={nodes.knight2.geometry}
                material={materials['Material.005']}
            />
        </animated.group>
    )
}

useGLTF.preload('/Black/knight-transformed.glb')
