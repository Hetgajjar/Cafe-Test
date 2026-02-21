import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { Box, Container, Typography, Avatar, Card, CardContent, Rating, Accordion, AccordionSummary, AccordionDetails, useTheme, useMediaQuery } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PerspectiveTilt from '../Effects/PerspectiveTilt';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    { name: 'Justyna Helen', role: 'Coffee Lover', image: '/assets/images/customer-1.jpg', text: 'The atmosphere here is unmatched. It\'s my go-to spot for both productive work sessions and catching up with friends. The latte art is always Instagram-worthy!' },
    { name: 'Fajar Siddiq', role: 'Coffee Enthusiast', image: '/assets/images/customer-2.jpg', text: 'I take my coffee seriously, and this place delivers. The single-origin pour-over is complex and perfectly brewed. Highly recommended for true aficionados.' },
    { name: 'Rob Hope', role: 'Creative Director', image: '/assets/images/customer-3.jpg', text: 'A hidden gem in the city. The staff is incredibly knowledgeable and friendly. The pastries are fresh, and the vibe is just pure creative fuel.' },
];

const Testimonials = () => {
    const sectionRef = useRef(null);
    const sliderRef = useRef(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(sliderRef.current, {
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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                    centerMode: true,
                    centerPadding: '0px', // Full width card on mobile
                    variableWidth: false,
                }
            }
        ],
        appendDots: dots => (
            <Box sx={{ bottom: '-40px !important' }}>
                <ul> {dots} </ul>
            </Box>
        )
    };

    return (
        <Box ref={sectionRef} id="customer" sx={{ py: 15, bgcolor: 'background.paper', overflow: 'hidden' }}>
            <Container>
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography variant="h3" component="h4" gutterBottom>
                        Customers Feedback
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
                    ref={sliderRef}
                    sx={{
                        '.slick-dots li button:before': { color: 'primary.main' }
                    }}
                >
                    {isMobile ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {testimonials.map((item, index) => (
                                <Accordion
                                    key={index}
                                    sx={{
                                        background: 'rgba(30, 28, 26, 0.6)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(221, 184, 146, 0.1)',
                                        borderRadius: '16px !important',
                                        color: 'text.primary',
                                        '&:before': { display: 'none' },
                                        '&.Mui-expanded': { margin: '0 0 16px 0' }
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
                                        sx={{
                                            '& .MuiAccordionSummary-content': {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2
                                            }
                                        }}
                                    >
                                        <Avatar
                                            src={item.image}
                                            alt={item.name}
                                            sx={{ width: 40, height: 40, border: '1px solid', borderColor: 'primary.main' }}
                                        />
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                                                {item.name}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontSize: '0.65rem' }}>
                                                {item.role}
                                            </Typography>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ pt: 0, pb: 3 }}>
                                        <Box sx={{ position: 'relative', pl: 2, borderLeft: '2px solid', borderColor: 'primary.main' }}>
                                            <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1.5, opacity: 0.9 }}>
                                                "{item.text}"
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Rating value={5} readOnly size="small" sx={{ color: 'primary.main', fontSize: '1rem' }} />
                                                <Typography variant="caption" color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <Box component="span" sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'currentColor' }} />
                                                    Verified
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Box>
                    ) : (
                        <Slider {...settings}>
                            {testimonials.map((item, index) => (
                                <Box key={index} sx={{ px: { xs: 1, md: 2 }, height: '100%' }}>
                                    <PerspectiveTilt intensity={5} scale={1.02}>
                                        <Card
                                            className="glass-card"
                                            sx={{
                                                height: '100%',
                                                width: '100%',
                                                minWidth: { xs: 'auto', md: 'auto' }, // Allow flex to handle width
                                                maxWidth: { xs: '100%', md: 'auto' },
                                                mx: { xs: 1, md: 0 }, // Add margin on mobile only
                                                p: { xs: 2.5, md: 3 }, // Slightly less padding on mobile
                                                borderRadius: '24px',
                                                position: 'relative',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                '&:before': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '6px',
                                                    height: '100%',
                                                    background: 'linear-gradient(to bottom, #D4AF37, #F8E71C)', // Gold accent bar
                                                    opacity: 0.8
                                                }
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                                    <Avatar
                                                        src={item.image}
                                                        alt={item.name}
                                                        sx={{ width: 56, height: 56, border: '2px solid', borderColor: 'primary.main' }}
                                                    />
                                                    <Box>
                                                        <Typography variant="h6" component="div" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                                                            {item.name}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                                                            {item.role}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <FormatQuoteIcon sx={{ fontSize: 40, color: 'primary.main', opacity: 0.3 }} />
                                            </Box>

                                            <CardContent sx={{ p: '0 !important', mb: 3, flexGrow: 1 }}>
                                                <Typography variant="body1" sx={{ fontStyle: 'italic', lineHeight: 1.6, fontSize: '1.05rem' }}>
                                                    "{item.text}"
                                                </Typography>
                                            </CardContent>

                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.7 }}>
                                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
                                                <Typography variant="caption" sx={{ fontWeight: 500 }}>
                                                    Verified Customer • {new Date().toLocaleDateString()}
                                                </Typography>
                                                <Rating value={5} readOnly size="small" sx={{ ml: 'auto', color: 'primary.main' }} />
                                            </Box>
                                        </Card>
                                    </PerspectiveTilt>
                                </Box>
                            ))}
                        </Slider>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default Testimonials;
