import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Box } from "@mui/material";
import './Preloader.scss';

const Preloader = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Disable scroll
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false); // Unmount after animation
        document.body.style.overflow = ""; // Re-enable scroll
      },
    });

    // Fade out after a simulated load time
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "power2.inOut",
      delay: 2.5
    });

  }, []);

  if (!isVisible) return null;

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#1E1C1A",
        zIndex: 99999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="loader"></div>
    </Box>
  );
};

export default Preloader;
