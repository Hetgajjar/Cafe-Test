import React from 'react';
import { ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { getTheme } from './theme';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';

// Lazy Load heavy/below-the-fold components
const Specials = React.lazy(() => import('./components/Specials/Specials'));
const About = React.lazy(() => import('./components/About/About'));
const Counter = React.lazy(() => import('./components/Counter/Counter'));
const Testimonials = React.lazy(() => import('./components/Testimonials/Testimonials'));
const Menu = React.lazy(() => import('./components/Menu/Menu'));
const Contact = React.lazy(() => import('./components/Contact/Contact'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));

// Lazy Load Effects
const HorizontalScroll = React.lazy(() => import('./components/Effects/HorizontalScroll'));
const SmoothScroll = React.lazy(() => import('./components/Effects/SmoothScroll'));
const CoffeeCupModel = React.lazy(() => import('./components/Effects/CoffeeCupModel'));

import BackgroundController from './components/Effects/BackgroundController';
import CustomCursor from './components/Effects/CustomCursor';
import CursorParticles from './components/Particles/CursorParticles';
import Marquee from './components/Effects/Marquee';
import Preloader from './components/Effects/Preloader';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(() => getTheme(prefersDarkMode ? 'dark' : 'light'), [prefersDarkMode]);

  // Dummy context value since we removed the toggle, to prevent breakage in components importing it
  const colorMode = React.useMemo(() => ({ toggleColorMode: () => { } }), []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Preloader />
        <BackgroundController />

        <CustomCursor />
        <CursorParticles />

        <React.Suspense fallback={null}>
          <CoffeeCupModel />
        </React.Suspense>

        <React.Suspense fallback={null}>
          <SmoothScroll>
            <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
              <Header />
              <Hero />
              <Marquee text="FRESH COFFEE • OPEN 24/7 • GOOD VIBES ONLY •" />

              <HorizontalScroll />
              <About />
              <Counter />
              <Marquee text="BEST BEANS IN TOWN • SUSTAINABLE • ORGANIC •" speed={1.5} />
              <Testimonials />
              <Menu />
              <Contact />
              <Footer />
            </SnackbarProvider>
          </SmoothScroll>
        </React.Suspense>

      </ThemeProvider>
    </ColorModeContext.Provider >
  );
}

export default App;
