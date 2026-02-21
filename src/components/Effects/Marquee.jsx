import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Box, Typography } from '@mui/material';

const Marquee = ({ text = "FRESH COFFEE • OPEN 24/7 • GOOD VIBES ONLY •", speed = 2 }) => {
    const marqueeRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const content = contentRef.current;
        const totalWidth = content.offsetWidth;

        // Clone for seamless loop
        const clone = content.cloneNode(true);
        marqueeRef.current.appendChild(clone);

        const tl = gsap.timeline({ repeat: -1 });
        tl.to([content, clone], {
            x: -totalWidth,
            duration: totalWidth / (50 * speed), // Adjust speed based on width
            ease: "none",
        });

        return () => {
            tl.kill();
            if (clone && clone.parentNode) clone.parentNode.removeChild(clone);
        };
    }, [text, speed]);

    return (
        <Box
            sx={{
                width: '100%',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                background: '#000',
                color: '#fff',
                py: { xs: 0.2, md: 1 },
                transform: 'rotate(-2deg)', // Gen Z tilt
                my: { xs: 1, md: 3 },
                borderTop: '2px solid #fff',
                borderBottom: '2px solid #fff',
            }}
            ref={marqueeRef}
        >
            <Typography
                ref={contentRef}
                variant="h4"
                component="div"
                sx={{
                    display: 'inline-block',
                    fontWeight: 900,
                    fontStyle: 'italic',
                    textTransform: 'uppercase',
                    fontSize: { xs: '1rem', md: '2.5rem' },
                    mr: { xs: 2, md: 4 },
                }}
            >
                {text}
            </Typography>
        </Box>
    );
};

export default Marquee;
