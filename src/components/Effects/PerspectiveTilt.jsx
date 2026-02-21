import React, { useRef, useState } from 'react';
import { Box } from '@mui/material';
import gsap from 'gsap';

const PerspectiveTilt = ({ children, intensity = 15, perspective = 1000, scale = 1.05 }) => {
    const cardRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -intensity;
        const rotateY = ((x - centerX) / centerX) * intensity;

        gsap.to(cardRef.current, {
            rotateX: rotateX,
            rotateY: rotateY,
            scale3d: isHovering ? scale : 1,
            duration: 0.4,
            ease: "power2.out",
            transformPerspective: perspective,
            transformOrigin: "center center"
        });
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
        gsap.to(cardRef.current, {
            scale: scale,
            duration: 0.4,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        gsap.to(cardRef.current, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)"
        });
    };

    return (
        <Box
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                width: '100%',
                height: '100%',
                transformStyle: 'preserve-3d', // Crucial for 3D effect
                perspective: `${perspective}px`,
                willChange: 'transform'
            }}
        >
            {children}
        </Box>
    );
};

export default PerspectiveTilt;
