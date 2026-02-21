import React, { useRef, useLayoutEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Box } from '@mui/material';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { Environment } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Scene = () => {
    const { viewport } = useThree();
    const meshRef = useRef();

    // Load Materials and Object
    const materials = useLoader(MTLLoader, '/3dmodel/tripo_convert_9e871402-e358-4cf3-9472-5cd83aca30b4.mtl');
    const obj = useLoader(OBJLoader, '/3dmodel/tripo_convert_9e871402-e358-4cf3-9472-5cd83aca30b4.obj', (loader) => {
        materials.preload();
        loader.setMaterials(materials);
    });

    useLayoutEffect(() => {
        // Since container is small (100px), we just want it centered or rotating in place?
        // User asked for "size", implying it's an icon.
        // Let's keep it centered in the small box and just rotate.

        gsap.set(meshRef.current.position, { x: 0, y: -0.5, z: 0 }); // Center it
        gsap.set(meshRef.current.rotation, { x: 0.2, y: -0.5, z: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5
            }
        });

        // Simple rotation based on scroll
        tl.to(meshRef.current.rotation, {
            y: Math.PI * 4, // More rotation
            ease: "none"
        });

    }, []); // removed viewport dependency as we stay centered

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.5; // Constant idle rotation
        }
    });

    const scene = obj.clone();

    return (
        <primitive
            object={scene}
            ref={meshRef}
            scale={5.5} // Increased scale to fill the small 100px/32px view
        />
    );
};

const CoffeeCupModel = () => {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 20, // Adjusted to sit nicely
                right: 20, // Moved to right for a badge/logo feel? Or keep left? User didn't specify pos, just size. Let's keep it fixed but maybe Top-Left as before? Original was 'top: 0, left: 0'.
                left: { xs: 20, md: 40 }, // Added some spacing
                width: { xs: '32px', md: '100px' },
                height: { xs: '32px', md: '100px' },
                pointerEvents: 'none',
                zIndex: 15
            }}
        >
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} style={{ background: 'transparent' }}>
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 5]} intensity={2} />
                <pointLight position={[-10, -10, -5]} color="#D4AF37" intensity={5} />
                <Suspense fallback={null}>
                    <Scene />
                    <Environment preset="sunset" />
                </Suspense>
            </Canvas>
        </Box>
    );
};

export default CoffeeCupModel;
