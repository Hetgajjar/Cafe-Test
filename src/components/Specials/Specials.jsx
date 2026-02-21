import React, { useEffect, useRef } from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const specials = [
    { title: 'Espresso Martini', image: '/assets/images/coffee-1.jpg', desc: 'A bold and sophisticated blend of premium vodka, coffee liqueur, and freshly brewed espresso.' },
    { title: 'Vanilla Latte', image: '/assets/images/coffee-2.jpg', desc: 'Smooth espresso combined with steamed milk and a hint of natural Madagascar vanilla.' },
    { title: 'Signature Black', image: '/assets/images/coffee-3.jpg', desc: 'Our single-origin pour-over, highlighting the rich, earthy notes of our finest beans.' },
];

const Specials = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".special-card", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <Box ref={sectionRef} id="specials" sx={{ py: 10, bgcolor: 'background.default' }}>
            <Container>
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography variant="h3" component="h4" gutterBottom>
                        Our Specials
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
                <Grid container spacing={4} justifyContent="center">
                    {specials.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Box className="special-card">
                                <Card className="glass-card glass-card--hover" sx={{ height: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <Box sx={{ p: 2 }}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={item.image}
                                            alt={item.title}
                                            sx={{ borderRadius: 2 }}
                                        />
                                    </Box>
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <Typography variant="h5" component="h5" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.desc}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Specials;
