import React from 'react'
export const Lights: React.FC = () => (
    <group>
        <directionalLight castShadow position={[0, 2, 0]} intensity={2} />
        <ambientLight intensity={0.4} position={[0, 2, 10]} />
        <directionalLight castShadow position={[0, -2, 0]} intensity={2} />

        {/* <directionalLight castShadow position={[0, -2, 2]} intensity={2} /> */}
        {/* <ambientLight intensity={0.5} /> */}
        <directionalLight castShadow position={[0, 0, -2]} intensity={0.5} />
        <directionalLight castShadow position={[0, 0, 2]} intensity={0.3} />
    </group>
)
