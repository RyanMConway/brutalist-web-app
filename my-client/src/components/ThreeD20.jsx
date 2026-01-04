import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three'; // Import Three.js for math utils

function Die({ isBrutalist }) {
    const meshRef = useRef();
    const [hovered, setHover] = useState(false);

    // Animation Loop (Runs 60fps)
    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // 1. Get Mouse Position (Normalized from -1 to 1)
        const { x, y } = state.mouse;

        // 2. Calculate Target Rotation (Tilt towards mouse)
        // We multiply by Math.PI to give it a full range of motion
        const targetX = y * 0.5; // Tilt up/down
        const targetY = x * 0.5; // Tilt left/right

        // 3. Apply Smooth "Magnetic" Movement (Lerp)
        // The '0.1' factor determines how "heavy" the object feels. Lower = Heavier.
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.1);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.1);

        // 4. Constant Background Spin
        // We add this ON TOP of the mouse movement so it's always alive
        meshRef.current.rotation.x += delta * 0.1;
        meshRef.current.rotation.y += delta * 0.15;

        // 5. Hover Effect: Scale up slightly when hovered
        const targetScale = hovered ? 2.4 : 2;
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.1);
        meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, targetScale, 0.1);
    });

    return (
        <mesh
            ref={meshRef}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            // Initial scale (will be overridden by lerp loop above)
            scale={2}
        >
            {/* 20-sided Geometry (Radius, Detail) */}
            <icosahedronGeometry args={[1, 0]} />

            {isBrutalist ? (
                // WIREFRAME MATERIAL (The Matrix Look)
                <meshStandardMaterial
                    color="#10b981"
                    wireframe={true}
                    emissive="#10b981"
                    emissiveIntensity={2}
                />
            ) : (
                // SOLID MATERIAL (The Sleek Look)
                <meshStandardMaterial
                    color="#3b82f6"
                    roughness={0.1}
                    metalness={0.8}
                />
            )}
        </mesh>
    );
}

export default function ThreeD20({ isBrutalist }) {
    return (
        <div className="w-full h-[400px]">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={isBrutalist ? 0.5 : 1} />

                {/* Floating Animation Wrapper */}
                <Float
                    speed={2} // Animation speed
                    rotationIntensity={0.5} // How much it bobs rotationally
                    floatIntensity={1} // How high it floats up/down
                >
                    <Die isBrutalist={isBrutalist} />
                </Float>

                {/* Reflections (Sleek mode only) */}
                {!isBrutalist && <Environment preset="city" />}
            </Canvas>
        </div>
    );
}