import React, { useEffect, useRef } from 'react';

const CursorParticles = () => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Set canvas size
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        // Track mouse
        const handleMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;

            // Spawn particles on move
            for (let i = 0; i < 3; i++) {
                particles.current.push(createParticle(mouse.current.x, mouse.current.y));
            }
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Particle class-like object
        function createParticle(x, y) {
            return {
                x,
                y,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
                life: 1, // Opacity/Life
                color: `rgba(212, 175, 55, ${Math.random()})` // Gold variations
            };
        }

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.current.forEach((particle, index) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.life -= 0.02; // Fade out speed
                particle.size -= 0.05; // Shrink speed

                if (particle.life <= 0 || particle.size <= 0) {
                    particles.current.splice(index, 1);
                } else {
                    ctx.fillStyle = particle.color;
                    ctx.globalAlpha = particle.life;
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            ctx.globalAlpha = 1; // Reset alpha
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none', // Crucial: clicks pass through
                zIndex: 9999, // On top of everything
            }}
        />
    );
};

export default CursorParticles;
