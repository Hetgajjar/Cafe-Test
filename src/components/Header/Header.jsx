import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, Container, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, useScrollTrigger } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../../App';
import gsap from 'gsap';

import Magnetic from '../Animations/Magnetic';

const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Menu', href: '#menu' },
    { label: 'Contact', href: '#contact' },
];





const Header = (props) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const navRef = useRef(null);
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 20,
    });

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(navRef.current, {
                y: -50,
                opacity: 0,
                duration: 1,
                ease: "elastic.out(1, 0.75)",
                delay: 0.5
            });
        }, navRef);
        return () => ctx.revert();
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box
            onClick={handleDrawerToggle}
            sx={{
                textAlign: 'center',
                height: '100%',
                background: theme.palette.mode === 'dark' ? 'rgba(20, 20, 20, 0.85)' : 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(16px)',
                borderRight: '1px solid rgba(255,255,255,0.08)'
            }}
        >
            <Box sx={{ py: 3, display: 'flex', justifyContent: 'center' }}>
                <img src="/assets/images/logo.svg" alt="Logo" style={{ height: 45 }} />
            </Box>
            <List sx={{ px: 2 }}>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton
                            sx={{
                                textAlign: 'center',
                                borderRadius: '12px',
                                '&:hover': {
                                    background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                                }
                            }}
                            href={item.href}
                        >
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{
                                    sx: { fontWeight: 600, fontSize: '1.1rem' },
                                    color: 'text.primary'
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box
            className="nav-pill"
            ref={navRef}
            sx={{
                position: 'fixed',
                top: 20,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                zIndex: 1100,
                pointerEvents: 'none', // Let clicks pass through outside the pill
            }}
        >
            <Box
                sx={{
                    pointerEvents: 'auto',
                    background: theme.palette.mode === 'dark' ? 'rgba(20, 20, 20, 0.6)' : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: '50px',
                    padding: '8px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(255,255,255,0.08)'
                }}
            >
                <Box component="a" href="#" sx={{ display: 'flex', alignItems: 'center', '& img': { height: 32 } }}>
                    <img src="/assets/images/logo.svg" alt="Logo" />
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
                    {navItems.map((item) => (
                        <Magnetic key={item.label}>
                            <Box
                                component="a"
                                href={item.href}
                                onClick={(e) => {
                                    if (item.label === 'Home') {
                                        e.preventDefault();
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }
                                }}
                                sx={{
                                    color: theme.palette.text.primary,
                                    textDecoration: 'none',
                                    fontSize: '0.95rem',
                                    fontWeight: 600,
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    transition: 'color 0.3s ease',
                                    '&:hover': {
                                        color: theme.palette.primary.main,
                                    }
                                }}
                            >
                                {item.label}
                            </Box>
                        </Magnetic>
                    ))}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerToggle}
                        sx={{ display: { md: 'none' }, ml: 1 }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Box>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

export default Header;
