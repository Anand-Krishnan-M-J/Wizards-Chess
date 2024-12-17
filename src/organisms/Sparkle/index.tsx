import React, { useRef } from 'react';
import { Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
const magicalColors = [
  '#7E5A9B', // Lavender Purple
  '#5A9BD6', // Mystic Blue
  '#E3B5A4', // Fairy Dust Pink
  '#C0C0C0', // Moonlight Silver
  '#2BC16B', // Enchanted Emerald
  '#FFD700', // Celestial Gold
  '#7FFFD4', // Ethereal Aqua
];

const RotatingSparkle: React.FC = () => {
  const sparkleRef = useRef<any>(null);

  // Rotate the sparkles around the Y-axis
  useFrame(() => {
    sparkleRef.current.rotation.y += 0.0002;
    sparkleRef.current.rotation.x += 0.0004;
    sparkleRef.current.rotation.z += 0.0001;
  });

  return (
    <group ref={sparkleRef}>
      {magicalColors.map((color) => (
        <Sparkles
          key={color}
          color={color}
          count={100}
          scale={750}
          size={110}
          speed={5}
          position={[0, 0, 0]}
          noise={0}
        />
      ))}
    </group>
  );
};

export default RotatingSparkle;
