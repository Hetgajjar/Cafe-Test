import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

gsap.registerPlugin(ScrollTrigger);

const BackgroundController = () => {
    const bgRef = useRef(null);
    const theme = useTheme();

    useEffect(() => {
        const bg = bgRef.current;

        // Initial set
        gsap.set(bg, { scale: 1 });

        // Parallax & Zoom Effect
        // Optimized: Removed rotation to reduce paint costs, added force3D
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5, // Smoother scrubbing
            }
        });

        tl.to(bg, {
            scale: 1.2, // Reduced scale factor
            force3D: true, // Hardware acceleration
            ease: "power1.out"
        });

        return () => {
            if (tl) tl.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <Box
            ref={bgRef}
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                backgroundImage: theme.palette.mode === 'light'
                    ? 'url(https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2574&auto=format&fit=crop)' // Latte/Coffee Art for Light
                    : 'url(https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2574&auto=format&fit=crop)', // Rich Espresso Shot for Dark
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.15,
                pointerEvents: 'none',
                filter: 'contrast(120%) brightness(110%)',
                willChange: 'transform', // Important for performance
                transform: 'translateZ(0)', // Force GPU layer
            }}
        />
    );
};

export default BackgroundController;
