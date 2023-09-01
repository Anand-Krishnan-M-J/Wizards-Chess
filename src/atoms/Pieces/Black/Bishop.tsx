import React from 'react'
import type * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { type GLTF } from 'three-stdlib'
import { useSpring, animated } from '@react-spring/three'
import { type PieceProps } from '../type'

type GLTFResult = GLTF & {
    nodes: {
        bishop5: THREE.Mesh
    }
    materials: {
        ['Material.001']: THREE.MeshStandardMaterial
    }
}

export const BlackBishop: React.FC<PieceProps> = (props) => {
    const { nodes, materials } = useGLTF(
        '/Black/blackBishop-transformed.glb'
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
                geometry={nodes.bishop5.geometry}
                position={[0, 5, 0]}
                material={materials['Material.001']}
            />
        </animated.group>
    )
}

useGLTF.preload('/Black/blackBishop-transformed.glb')
