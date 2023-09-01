import React from 'react'
import type * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { type GLTF } from 'three-stdlib'
import { useSpring, animated } from '@react-spring/three'
import { type PieceProps } from '../type'

type GLTFResult = GLTF & {
    nodes: {
        king3: THREE.Mesh
    }
    materials: {
        ['Material.001']: THREE.MeshStandardMaterial
    }
}

export const BlackKing: React.FC<PieceProps> = (props) => {
    const { nodes, materials } = useGLTF(
        '/Black/blackKing-transformed.glb'
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
                geometry={nodes.king3.geometry}
                material={materials['Material.001']}
            />
        </animated.group>
    )
}

useGLTF.preload('/Black/blackKing-transformed.glb')
