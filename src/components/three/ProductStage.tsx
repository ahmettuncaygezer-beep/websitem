'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import {
    OrbitControls,
    Stage,
    Environment,
    ContactShadows,
    PerspectiveCamera,
    PresentationControls,
    Float
} from '@react-three/drei';
import { Loader2 } from 'lucide-react';

interface ProductStageProps {
    children: React.ReactNode;
}

export function ProductStage({ children }: ProductStageProps) {
    return (
        <div className="w-full h-full relative bg-[#F5F5F3]">
            <Suspense fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="animate-spin text-gold" size={40} />
                </div>
            }>
                <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 45 }}>
                    <color attach="background" args={['#F5F5F3']} />

                    <PresentationControls
                        speed={1.5}
                        global
                        zoom={0.7}
                        polar={[-0.1, Math.PI / 4]}
                    >
                        <Stage environment="city" intensity={0.6} shadows="contact">
                            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                                {children}
                            </Float>
                        </Stage>
                    </PresentationControls>

                    <ContactShadows
                        position={[0, -0.8, 0]}
                        opacity={0.4}
                        scale={10}
                        blur={2.5}
                        far={2}
                    />

                    <Environment preset="city" />
                    <OrbitControls
                        enableZoom={true}
                        enablePan={false}
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI / 2.1}
                        makeDefault
                    />
                </Canvas>
            </Suspense>
        </div>
    );
}
