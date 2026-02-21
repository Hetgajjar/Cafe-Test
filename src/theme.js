import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // Light mode - "Modern Warm Cafe"
                primary: {
                    main: '#B08968', // Warm Almond/Latte
                },
                secondary: {
                    main: '#7F5539', // Medium Roast
                },
                background: {
                    default: '#F9F7F2', // Cream/Milk Foam
                    paper: 'rgba(255, 255, 255, 0.7)', // Frosted Glass
                },
                text: {
                    primary: '#3D3028', // Dark Espresso
                    secondary: '#5D4037',
                },
            }
            : {
                // Dark mode - "Cozy Evening"
                primary: {
                    main: '#DDB892', // Pale Wood/Crema
                },
                secondary: {
                    main: '#A47E5B', // Cinnamon
                },
                background: {
                    default: '#1E1C1A', // Very Dark Brown/Black
                    paper: 'rgba(30, 28, 26, 0.6)', // Dark Glass
                },
                text: {
                    primary: '#EDE0D4', // Steamed Milk
                    secondary: 'rgba(237, 224, 212, 0.7)',
                },
            }),
    },
    typography: {
        fontFamily: '"Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontFamily: '"Cormorant Garamond", serif',
            letterSpacing: '0.02em',
        },
        h2: {
            fontFamily: '"Cormorant Garamond", serif',
            letterSpacing: '0.02em',
        },
        h3: {
            fontFamily: '"Cormorant Garamond", serif',
            letterSpacing: '0.01em',
        },
        button: {
            fontFamily: '"Nunito", sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 700,
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundImage: mode === 'light'
                        ? 'radial-gradient(circle at 50% 0%, #F9F7F2 0%, #E6DFD5 100%)'
                        : 'radial-gradient(circle at 50% 0%, #2C2520 0%, #0F0E0D 100%)',
                    backgroundAttachment: 'fixed',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(10px)',
                    border: mode === 'light'
                        ? '1px solid rgba(255, 255, 255, 0.3)'
                        : '1px solid rgba(255, 255, 255, 0.12)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 50, // Full pill shape
                    padding: '12px 32px',
                    fontSize: '1rem',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)', // Soft exponential
                    '&:hover': {
                        transform: 'scale(1.05) rotate(-1deg)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                        letterSpacing: '0.15em',
                    },
                },
            },
        },
    },
});
