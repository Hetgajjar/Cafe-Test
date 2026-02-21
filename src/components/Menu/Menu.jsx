import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import PerspectiveTilt from '../Effects/PerspectiveTilt';
import { useSnackbar } from 'notistack';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Menu = () => {
    const { enqueueSnackbar } = useSnackbar();
    const menuRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Card animation
            gsap.from(cardRef.current, {
                scrollTrigger: {
                    trigger: menuRef.current,
                    start: "top 75%",
                },
                y: 50,
                opacity: 0,
                scale: 0.9,
                duration: 1,
                ease: "power2.out"
            });

            // Parallax Background
            gsap.fromTo(menuRef.current,
                { backgroundPosition: "50% 0%" },
                {
                    backgroundPosition: "50% 100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: menuRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        }, menuRef);

        return () => ctx.revert();
    }, []);

    const handleViewMenu = () => {
        enqueueSnackbar('Full menu coming soon!', { variant: 'info' });
    };

    return (
        <Box
            ref={menuRef}
            id="menu"
            sx={{
                py: 15,
                backgroundImage: 'url(/assets/images/coffee_menu_bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                backgroundAttachment: 'fixed',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.7)',
                }
            }}
        >
            <Container sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <PerspectiveTilt>
                    <Box
                        ref={cardRef}
                        className="glass-card"
                        sx={{
                            maxWidth: '800px',
                            mx: 'auto',
                            border: '1px solid rgba(255,255,255,0.2)',
                            background: 'rgba(0,0,0,0.4)',
                            backdropFilter: 'blur(20px)'
                        }}
                    >
                        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                            Curated Selection
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 4, opacity: 0.9, fontSize: '1.2rem' }}>
                            Explore our hand-picked variety of single-origin beans and artisanal pastries.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleViewMenu}
                            sx={{
                                borderRadius: 50,
                                px: 5,
                                py: 1.5,
                                fontSize: '1.1rem',
                                background: 'white',
                                color: 'black',
                                '&:hover': {
                                    background: 'rgba(255,255,255,0.9)'
                                }
                            }}
                        >
                            View Full Menu
                        </Button>
                    </Box>
                </PerspectiveTilt>
            </Container>
        </Box>
    );
};

export default Menu;
