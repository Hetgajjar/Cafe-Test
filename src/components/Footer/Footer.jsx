import React, { useEffect, useRef } from 'react';
import { Box, Container, Grid, Typography, TextField, IconButton, Link, ImageList, ImageListItem } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import { useSnackbar } from 'notistack';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

const Footer = () => {
    const { enqueueSnackbar } = useSnackbar();
    const footerRef = useRef(null);

    const handleSubscribe = (e) => {
        e.preventDefault();
        enqueueSnackbar('Subscribed locally! (This is a demo)', { variant: 'success' });
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".footer-content", {
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 90%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <Box ref={footerRef} id="footer" sx={{ bgcolor: '#000', color: 'white', position: 'relative', pt: 10 }}>
            {/* Newsletter Section */}
            <Box className="footer-content" sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)', pb: 8 }}>
                <Container>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" sx={{ fontFamily: 'Playfair Display', mb: 1 }}>
                                Subscribe Our Newsletter
                            </Typography>
                            <Typography variant="body1" sx={{ opacity: 0.7 }}>
                                To receive monthly updates
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box
                                component="form"
                                onSubmit={handleSubscribe}
                                sx={{
                                    display: 'flex',
                                    position: 'relative',
                                    maxWidth: '500px',
                                    ml: { md: 'auto' }
                                }}
                            >
                                <TextField
                                    fullWidth
                                    placeholder="Enter Your Email"
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            color: 'white',
                                            bgcolor: 'rgba(255,255,255,0.05)',
                                            borderRadius: '50px',
                                            pr: 7
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                                    }}
                                />
                                <IconButton
                                    type="submit"
                                    sx={{
                                        position: 'absolute',
                                        right: 5,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        '&:hover': { bgcolor: 'primary.dark' }
                                    }}
                                >
                                    <SendIcon />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Widgets Section */}
            <Container sx={{ py: 10 }}>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={4} className="footer-content">
                        <Typography variant="h5" sx={{ fontFamily: 'Playfair Display', mb: 3 }}>
                            About Us
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7, mb: 3, lineHeight: 1.8 }}>
                            Cafe is more than just a place to grab a cup of coffee; it's a community hub dedicated to the art of brewing. We bring you the finest beans from around the world.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon].map((Icon, idx) => (
                                <IconButton key={idx} sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                                    <Icon fontSize="small" />
                                </IconButton>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4} className="footer-content">
                        <Typography variant="h5" sx={{ fontFamily: 'Playfair Display', mb: 3 }}>
                            Opening Hours
                        </Typography>
                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, opacity: 0.7, lineHeight: 2 }}>
                            <li>Mon-Fri: 08.00 A.M - 10.00 P.M</li>
                            <li>Saturday: 08.00 A.M - 02.00 P.M</li>
                            <li>Sunday: Closed</li>
                            <li>Half-Holidays: 08.00 A.M - 02.00 P.M</li>
                            <li>Twe: 08.00 A.M - 02.00 P.M</li>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4} className="footer-content">
                        <Typography variant="h5" sx={{ fontFamily: 'Playfair Display', mb: 3 }}>
                            Instagram Feed
                        </Typography>
                        <ImageList
                            sx={{ width: '100%', height: 300, overflow: 'hidden' }}
                            variant="quilted"
                            cols={2}
                            rowHeight={150}
                        >
                            {[
                                { img: '/assets/images/instagram-1.jpg', cols: 1, rows: 1 },
                                { img: '/assets/images/instagram-2.jpg', cols: 1, rows: 1 },
                                { img: '/assets/images/instagram-3.jpg', cols: 1, rows: 2 },
                                { img: '/assets/images/instagram-4.jpg', cols: 1, rows: 2 },
                            ].map((item) => (
                                <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                                    <img
                                        {...srcset(item.img, 150, item.rows, item.cols)}
                                        alt={item.title}
                                        loading="lazy"
                                        style={{ borderRadius: '8px' }}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Grid>
                </Grid>
            </Container>

            {/* Copyright */}
            <Box className="footer-content" sx={{ bgcolor: '#000', py: 3, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <Container>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                        Designed and Developed by <Link href="#" color="primary" underline="hover">HET</Link>
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default Footer;
