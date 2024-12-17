import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { isServer } from '@/helpers/common';
import { pieceTypeColor } from '@/store/pieces/types';
import { CheckerBoard } from '../../organisms/CheckerBoard';
import { Lights } from '../../organisms/Lights';
import { PieceRenderer } from '../../organisms/PieceRenderer';

export const BoardAndPieces: React.FC = () => {
  const groupRef = useRef<any>(null);
  const [startAnimation, setStartAnimation] = React.useState(false);
  const isBlackPieces = !isServer && sessionStorage.getItem('pieceType') === pieceTypeColor.black;

  // Define initial and final rotations
  const initialRotation = {
    x: isBlackPieces ? Math.PI / 10 : -Math.PI / 10,
    y: -Math.PI / 2,
  };
  const finalRotation = {
    x: 0,
    y: 0,
  };

  useEffect(() => {
    if (groupRef.current) {
      // Set initial rotation
      groupRef.current.rotation.set(initialRotation.x, initialRotation.y, 0);
      groupRef.current.scale.set(1.05, 1.05, 1.05);

      // Start animation after a delay
      setTimeout(() => {
        setStartAnimation(true);
      }, 2500);
    }
  }, []);

  useFrame((state, delta) => {
    if (startAnimation && groupRef.current) {
      // Interpolate rotation
      groupRef.current.rotation.x += (finalRotation.x - groupRef.current.rotation.x) * 0.03; // Adjust the multiplier for speed
      groupRef.current.rotation.y += (finalRotation.y - groupRef.current.rotation.y) * 0.03;

      // Scale down smoothly
      const scaleSpeed = 0.02 * delta;
      groupRef.current.scale.x = Math.max(1, groupRef.current.scale.x - scaleSpeed);
      groupRef.current.scale.y = Math.max(1, groupRef.current.scale.y - scaleSpeed);
      groupRef.current.scale.z = Math.max(1, groupRef.current.scale.z - scaleSpeed);
    }
  });

  return (
    <group ref={groupRef}>
      <Lights />
      <PieceRenderer />
      <CheckerBoard />
    </group>
  );
};
