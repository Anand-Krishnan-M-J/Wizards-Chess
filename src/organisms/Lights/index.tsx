import React from 'react'
export const Lights: React.FC = () => (
    <group>
        <directionalLight castShadow position={[0, 2, 0]} intensity={2} />
        <ambientLight intensity={0.3} />
        <directionalLight castShadow position={[0, -2, 0]} intensity={2} />
    </group>
)
