import React, { useEffect, useRef } from 'react';
import { Box, Container, Grid, Typography, IconButton, useTheme } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const imgRef = useRef(null);
    const theme = useTheme();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(imgRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
                x: -50,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });

            gsap.from(textRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
                x: 50,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: "power2.out"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <Box ref={sectionRef} id="about" sx={{ py: 15, position: 'relative' }}>
            <Container>
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography variant="h3" component="h4" gutterBottom>
                        Our Story
                    </Typography>
                    <Box sx={{
                        width: '100px',
                        height: '2px',
                        bgcolor: 'primary.main',
                        mx: 'auto',
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            width: '10px',
                            height: '10px',
                            bgcolor: 'primary.main',
                            top: '-4px',
                            left: '50%',
                            transform: 'translateX(-50%) rotate(45deg)'
                        }
                    }} />
                </Box>
                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box
                            ref={imgRef}
                            component="div"
                            className="glass-card"
                            sx={{
                                position: 'relative',
                                display: 'inline-block',
                                p: 1,
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '20px',
                                    left: '-20px',
                                    right: '20px',
                                    bottom: '-20px',
                                    border: '2px solid',
                                    borderColor: 'primary.main',
                                    zIndex: -1,
                                    borderRadius: 4
                                }
                            }}
                        >
                            <Box
                                component="img"
                                src="/assets/images/about.jpg"
                                alt="about"
                                sx={{
                                    width: '100%',
                                    borderRadius: 4,
                                    display: 'block'
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            ref={textRef}
                            sx={{
                                p: 4,
                                borderRadius: '24px',
                                background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(20, 20, 20, 0.6)',
                                backdropFilter: 'blur(20px)',
                                border: `1px solid ${theme.palette.divider}`,
                                boxShadow: theme.shadows[4],
                            }}
                        >
                            <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>
                                About Coffee Shop
                            </Typography>
                            <Typography variant="body1" paragraph sx={{
                                color: theme.palette.text.primary,
                                mb: 3,
                                fontSize: '1.1rem',
                                lineHeight: 1.8
                            }}>
                                Founded in the heart of the city, Cafe is a sanctuary for coffee lovers. We believe in sourcing ethically grown beans and roasting them to perfection. Our baristas are artisans, dedicated to crafting the perfect cup for you.
                            </Typography>
                            <Typography variant="body1" paragraph sx={{
                                color: theme.palette.text.primary,
                                mb: 4,
                                fontSize: '1.1rem',
                                lineHeight: 1.8
                            }}>
                                Whether you're here for a quick morning brew or a relaxing afternoon with friends, our warm ambiance and premium selection promise an unforgettable experience.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon].map((Icon, index) => (
                                    <IconButton
                                        key={index}
                                        sx={{
                                            bgcolor: theme.palette.text.primary,
                                            color: theme.palette.background.default,
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                bgcolor: theme.palette.primary.main,
                                                color: '#fff',
                                                transform: 'translateY(-3px)'
                                            }
                                        }}
                                    >
                                        <Icon />
                                    </IconButton>
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default About;
