import React, { useEffect, useRef } from 'react';
import { Box, Container, Grid, Typography, TextField, Button, useTheme } from '@mui/material';
import { useSnackbar } from 'notistack';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const { enqueueSnackbar } = useSnackbar();
    const sectionRef = useRef(null);
    const formRef = useRef(null);
    const theme = useTheme(); // Hook to access theme

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(formRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        enqueueSnackbar('Message sent successfully! We will get back to you soon.', { variant: 'success' });
    };

    return (
        <Box ref={sectionRef} id="contact" sx={{ pb: 10, position: 'relative' }}>
            <Box sx={{ pt: { xs: 12, md: 15 }, pb: { xs: 8, md: 15 } }}>
                <Container>
                    <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 8 } }}>
                        <Typography
                            variant="h3"
                            component="h4"
                            gutterBottom
                            sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
                        >
                            Get In Touch
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
                    <Box
                        ref={formRef}
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            maxWidth: '800px',
                            width: '100%',
                            mx: 'auto',
                            p: { xs: 3, md: 5 },
                            borderRadius: { xs: '16px', md: '24px' },
                            background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(20, 20, 20, 0.6)',
                            backdropFilter: 'blur(20px)',
                            border: `1px solid ${theme.palette.divider}`,
                            boxShadow: theme.shadows[4],
                        }}
                    >
                        <Grid container spacing={3}>
                            {['Name', 'Email', 'Subject', 'Message'].map((field, index) => (
                                <Grid item xs={12} md={field === 'Subject' || field === 'Message' ? 12 : 6} key={field}>
                                    <TextField
                                        fullWidth
                                        label={field}
                                        variant="outlined"
                                        multiline={field === 'Message'}
                                        rows={field === 'Message' ? 4 : 1}
                                        type={field === 'Email' ? 'email' : 'text'}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                color: theme.palette.text.primary,
                                                backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.05)',
                                                borderRadius: '12px',
                                                '& fieldset': {
                                                    borderColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: theme.palette.primary.main,
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: theme.palette.primary.main,
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: theme.palette.text.secondary,
                                            },
                                            '& .MuiInputLabel-root.Mui-focused': {
                                                color: theme.palette.primary.main,
                                            }
                                        }}
                                    />
                                </Grid>
                            ))}
                            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{ px: 5, py: 1.5, borderRadius: 10, fontSize: '1rem', fontWeight: 600 }}
                                >
                                    SUBMIT
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
            <Box height="400px" width="100%">
                <iframe
                    src="https://maps.google.com/maps?q=Mission%20District%2C%20San%20Francisco%2C%20CA%2C%20USA&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0, filter: 'grayscale(100%) invert(90%)' }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                    title="map"
                />
            </Box>
        </Box>
    );
};

export default Contact;
