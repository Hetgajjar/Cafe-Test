import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box } from '@mui/material';

gsap.registerPlugin(ScrollTrigger);

const TextReveal = ({ children, delay = 0, width = "100%" }) => {
    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;

        // Simple "Slide Up & Fade In" effect
        // NOTE: For true word-by-word spread, we'd need SplitText (Paid) or a complex splitter function.
        // We will stick to a clean line reveal for now which is very Webflow-y.

        gsap.fromTo(element,
            {
                y: 100,
                opacity: 0,
                rotate: 2
            },
            {
                y: 0,
                opacity: 1,
                rotate: 0,
                duration: 1.2,
                ease: "power4.out",
                delay: delay,
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%", // Trigger when top of element hits 85% of viewport
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, [delay]);

    return (
        <Box
            ref={elementRef}
            sx={{
                opacity: 0, // Initial state handled by GSAP, but good to hide FOUC
                width: width,
                position: 'relative',
                overflow: 'hidden' // Keeps the slide-up contained
            }}
        >
            {children}
        </Box>
    );
};

export default TextReveal;
