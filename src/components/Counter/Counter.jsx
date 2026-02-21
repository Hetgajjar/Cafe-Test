import React, { useEffect, useRef } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const counters = [
    { count: '36546', label: 'Coffee Served' },
    { count: '28', label: 'Type of Coffees' },
    { count: '12', label: 'Team Members' },
];

const Counter = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray(".counter-item").forEach((item) => {
                const target = item.querySelector("span");

                gsap.from(item, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2
                });

                if (target) {
                    gsap.from(target, {
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 80%",
                        },
                        innerText: 0,
                        duration: 2,
                        snap: { innerText: 1 },
                        ease: "power1.out",
                        onUpdate: function () {
                            target.innerText = Math.ceil(this.targets()[0].innerText);
                        }
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <Box
            ref={sectionRef}
            id="counter"
            sx={{
                py: 12,
                position: 'relative',
                backgroundImage: 'url(/assets/images/counter_bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.6)',
                }
            }}
        >
            <Container sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={4} justifyContent="center">
                    {counters.map((item, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Box
                                className="glass-card counter-item"
                                sx={{
                                    textAlign: 'center',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(255,255,255,0.05)'
                                }}
                            >
                                <Typography variant="h2" component="span" sx={{ fontWeight: 700, color: 'primary.main', display: 'block', mb: 1 }}>
                                    {item.count}
                                </Typography>
                                <Typography variant="h6" component="p" sx={{ opacity: 0.9 }}>
                                    {item.label}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Counter;
