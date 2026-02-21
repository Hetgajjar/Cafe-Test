import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { useSnackbar } from 'notistack';

import Magnetic from '../Animations/Magnetic';


import TextReveal from '../Effects/TextReveal';

const Hero = () => {
    const { enqueueSnackbar } = useSnackbar();

    const handlePurchase = () => {
        enqueueSnackbar('Feature coming soon! Experience the premium difference.', { variant: 'info' });
    };

    return (
        <Box
            sx={{
                height: '100vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))',
                    zIndex: 1,
                },
            }}
        >
            {/* Optimized LCP Background Image */}
            <Box
                component="img"
                src="/assets/images/hero_bg_premium.png"
                alt="Cafe Ambience"
                fetchPriority="high"
                loading="eager"
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0,
                }}
            />
            <Container sx={{ position: 'relative', zIndex: 2 }}>
                <Grid container>
                    <Grid item xs={12} md={10}>
                        <Box>
                            <TextReveal>
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontSize: { xs: '3rem', md: '5.5rem' },
                                        fontWeight: 700,
                                        color: '#F5F5F0',
                                        mb: 2,
                                        lineHeight: 1.1,
                                        textShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                        letterSpacing: '-0.02em',
                                    }}
                                >
                                    Experience the <Box component="span" sx={{ color: '#D4AF37' }}>Art</Box> of Coffee
                                </Typography>
                            </TextReveal>

                            <TextReveal delay={0.2}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: { xs: '1.2rem', md: '1.4rem' },
                                        color: 'rgba(245, 245, 240, 0.9)',
                                        mb: 5,
                                        maxWidth: '650px',
                                        fontWeight: 300,
                                        lineHeight: 1.6,
                                    }}
                                >
                                    Welcome to Cafe, where every cup is a masterpiece handcrafted with passion, precision, and the finest beans.
                                </Typography>
                            </TextReveal>

                            <Box sx={{ display: 'inline-block' }}>
                                <Magnetic>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        onClick={handlePurchase}
                                        sx={{
                                            py: 2,
                                            px: 5,
                                            fontSize: '1rem',
                                            fontWeight: 700,
                                            letterSpacing: '0.15em',
                                            borderRadius: '50px',
                                            background: '#D4AF37',
                                            color: '#000',
                                            boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)',
                                            textTransform: 'uppercase',
                                            transition: 'background 0.3s ease, box-shadow 0.3s ease',
                                            '&:hover': {
                                                background: '#F8E71C',
                                                boxShadow: '0 0 30px rgba(212, 175, 55, 0.6)',
                                            }
                                        }}
                                    >
                                        Reserve a Table
                                    </Button>
                                </Magnetic>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Hero;
