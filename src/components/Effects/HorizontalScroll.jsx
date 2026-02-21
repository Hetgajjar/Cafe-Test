import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Typography, Container } from '@mui/material';
import PerspectiveTilt from './PerspectiveTilt';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        const pin = gsap.fromTo(
            sectionRef.current,
            {
                translateX: 0,
            },
            {
                translateX: "-300vw", // Move left by 3 full viewports (assuming 4 items)
                ease: "none",
                duration: 1,
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "2000 top", // Scroll distance
                    scrub: 0.6,
                    pin: true,
                    anticipatePin: 1
                },
            }
        );

        return () => {
            if (pin) pin.kill();
        };
    }, []);

    const cards = [
        { title: "Espresso", desc: "Pure Energy", color: "#6F4E37", img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800" },
        { title: "Latte", desc: "Smooth & Creamy", color: "#ab8a6b", img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800" },
        { title: "Cold Brew", desc: "Chilled Perfection", color: "#3B2F2F", img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800" },
        { title: "Matcha", desc: "Green Zen", color: "#6a7b6a", img: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?q=80&w=800" }
    ];

    return (
        <Box
            ref={triggerRef}
            sx={{
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
                position: 'relative'
            }}>
            <Box
                ref={sectionRef}
                sx={{
                    height: '100vh',
                    width: '400vw', // 4 slides
                    display: 'flex',
                    flexWrap: 'nowrap',
                }}
            >
                {cards.map((card, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: '100vw',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: card.color, // Fallback / Base
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Background Overlay for texture */}
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundImage: `url(${card.img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'blur(20px) brightness(0.3)',
                            zIndex: 1
                        }} />

                        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 8, flexDirection: { xs: 'column', md: 'row' } }}>
                            {/* Text Content */}
                            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontWeight: 900,
                                        textTransform: 'uppercase',
                                        fontSize: { xs: '3rem', md: '7rem' },
                                        lineHeight: 0.9,
                                        mb: 2,
                                        color: '#fff',
                                        textShadow: '0 10px 30px rgba(0,0,0,0.3)'
                                    }}
                                >
                                    {card.title}
                                </Typography>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 300,
                                        color: 'rgba(255,255,255,0.9)',
                                        fontSize: { xs: '1.2rem', md: '2rem' },
                                        letterSpacing: '1px'
                                    }}
                                >
                                    {card.desc}
                                </Typography>
                            </Box>

                            {/* Product Image */}
                            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                                <PerspectiveTilt intensity={20} scale={1.1}>
                                    <Box
                                        component="img"
                                        src={card.img}
                                        alt={card.title}
                                        sx={{
                                            width: { xs: '250px', md: '450px' },
                                            height: { xs: '250px', md: '450px' },
                                            objectFit: 'cover',
                                            borderRadius: '20px',
                                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                                            // Transform is handled by Tilt now, removing conflict
                                        }}
                                    />
                                </PerspectiveTilt>
                            </Box>
                        </Container>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default HorizontalScroll;
