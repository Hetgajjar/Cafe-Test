import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Box } from '@mui/material';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;

        const moveCursor = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
        };

        const onHoverStart = () => setIsHovering(true);
        const onHoverEnd = () => setIsHovering(false);

        window.addEventListener('mousemove', moveCursor);

        // Add event listeners to interactive elements
        const links = document.querySelectorAll('a, button, .pointer');
        links.forEach(link => {
            link.addEventListener('mouseenter', onHoverStart);
            link.addEventListener('mouseleave', onHoverEnd);
        });

        // Clean up
        return () => {
            window.removeEventListener('mousemove', moveCursor);
            links.forEach(link => {
                link.removeEventListener('mouseenter', onHoverStart);
                link.removeEventListener('mouseleave', onHoverEnd);
            });
        };
    }, []);

    useEffect(() => {
        // Pulse effect on hover
        if (isHovering) {
            gsap.to(cursorRef.current, { scale: 0.5, opacity: 0.5 });
        } else {
            gsap.to(cursorRef.current, { scale: 1, opacity: 1 });
        }
    }, [isHovering]);

    return (
        <>
            <Box
                ref={cursorRef}
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '10px',
                    height: '10px',
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    transform: 'translate(-50%, -50%)',
                    mixBlendMode: 'difference'
                }}
            />
        </>
    );
};

export default CustomCursor;
