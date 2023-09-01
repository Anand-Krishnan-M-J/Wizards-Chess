import React from 'react'
import type * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { type GLTF } from 'three-stdlib'
import { useSpring, a } from '@react-spring/three'
import { type PieceProps } from '../type'

type GLTFResult = GLTF & {
    nodes: {
        rook3: THREE.Mesh
    }
    materials: {
        ['Material.002']: THREE.MeshStandardMaterial
    }
}

export const BlackRook: React.FC<PieceProps> = (props) => {
    const { nodes, materials } = useGLTF(
        '/Black/rook-transformed.glb'
    ) as GLTFResult
    const animationProps = useSpring({
        position: props.position,
        config: { duration: 1000 }, // Animation duration in milliseconds
    })

    return (
        <a.group {...animationProps} dispose={null} onClick={props.onClick}>
            <mesh
                geometry={nodes.rook3.geometry}
                material={materials['Material.002']}
            />
        </a.group>
    )
}

useGLTF.preload('/Black/rook-transformed.glb')
