'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function CityBlock() {
  const groupRef = useRef<THREE.Group>(null);

  // Slow rotation animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  // Create a simple city block with varying building heights
  const buildings = [
    { position: [-2, 1.5, -2], height: 3, color: '#4a5568' },
    { position: [0, 2.5, -2], height: 5, color: '#2d3748' },
    { position: [2, 2, -2], height: 4, color: '#1a202c' },
    { position: [-2, 2, 0], height: 4, color: '#2d3748' },
    { position: [0, 1, 0], height: 2, color: '#4a5568' },
    { position: [2, 1.5, 0], height: 3, color: '#1a202c' },
    { position: [-2, 1.8, 2], height: 3.5, color: '#1a202c' },
    { position: [0, 2.2, 2], height: 4.5, color: '#4a5568' },
    { position: [2, 2.5, 2], height: 5, color: '#2d3748' },
  ];

  return (
    <group ref={groupRef}>
      {buildings.map((building, index) => (
        <mesh
          key={index}
          position={[building.position[0], building.position[1], building.position[2]]}
        >
          <boxGeometry args={[1.5, building.height, 1.5]} />
          <meshStandardMaterial color={building.color} />
        </mesh>
      ))}
      {/* Base platform */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#cbd5e0" />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [8, 6, 8], fov: 50 }}
      style={{ background: 'transparent' }}
      aria-label="3D city visualization"
    >
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, 5, -5]} intensity={0.3} />
      
      {/* Scene */}
      <CityBlock />
      
      {/* Controls with constraints */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        autoRotate={false}
      />
    </Canvas>
  );
}

