/**
 * USA.Healthcare - Interactive Dashboard Logic
 * Handles dynamic navigation tabs, step indicators, content transitions,
 * and real-time glowing wave canvas background animations.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Navigation Tab Content Controller
    // ==========================================
    const navPills = document.querySelectorAll('.nav-pill');
    const heroTitle = document.querySelector('.hero-title');
    const stepDots = document.querySelectorAll('.step-dot');
    
    // Tab contents mapping
    const tabContents = {
        'home': {
            title: 'Transforming <br> healthcare through <br> innovation',
            step: 0
        },
        'about': {
            title: 'Connecting <br> information, tech, <br> & active care',
            step: 1
        },
        'benefits': {
            title: 'Premium secure <br> platform tools <br> & capabilities',
            step: 2
        },
        'contact': {
            title: 'Get in touch <br> with our support <br> & integrations',
            step: 2
        }
    };

    navPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            // Only capture clicks on hashes (navigation tabs)
            const targetHash = pill.getAttribute('href').replace('#', '') || 'home';
            const content = tabContents[targetHash];
            
            if (content) {
                e.preventDefault();

                // 1. Update active nav pill state
                navPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');

                // 2. Animate and update Hero Title
                heroTitle.style.opacity = '0';
                heroTitle.style.transform = 'translateY(10px)';
                heroTitle.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

                setTimeout(() => {
                    heroTitle.innerHTML = content.title;
                    heroTitle.style.opacity = '1';
                    heroTitle.style.transform = 'translateY(0)';
                }, 250);

                // 3. Update active Step Dot state
                stepDots.forEach((dot, index) => {
                    if (index === content.step) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        });
    });

    // ==========================================
    // 2. Extra Interactive Button Events
    // ==========================================
    const howWeWorkBtn = document.getElementById('how-we-work-btn');
    if (howWeWorkBtn) {
        howWeWorkBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Automatically click the "About" navigation tab
            const aboutTab = document.querySelector('a[href="#about"]');
            if (aboutTab) aboutTab.click();
        });
    }

    const btnArrow = document.querySelector('.btn-arrow');
    if (btnArrow) {
        btnArrow.addEventListener('click', (e) => {
            e.preventDefault();
            // Pulse the Tally Card to highlight it
            const tallyCard = document.querySelector('.tally-glass-card');
            if (tallyCard) {
                tallyCard.style.transform = 'scale(1.03)';
                tallyCard.style.borderColor = 'rgba(37, 99, 235, 0.8)';
                tallyCard.style.boxShadow = '0 25px 60px rgba(37, 99, 235, 0.2)';
                tallyCard.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                
                setTimeout(() => {
                    tallyCard.style.transform = '';
                    tallyCard.style.borderColor = '';
                    tallyCard.style.boxShadow = '';
                }, 800);
            }
        });
    }

    // ==========================================
    // 3. Animated Glowing Wave Background
    // ==========================================
    const canvas = document.getElementById('wave-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Resize Canvas to fill parent container
        const resizeCanvas = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };

        // Wave Configurations representing the flowing connection line style
        const waves = [
            {
                amplitude: 38,
                frequency: 0.003,
                speed: 0.007,
                phase: 0,
                yOffset: 0.58, // vertical offset percentage
                glowWidth: 6,
                glowColor: 'rgba(6, 182, 212, 0.08)', // Cyan glow
                lineWidth: 1.5,
                lineColor: 'rgba(6, 182, 212, 0.55)'
            },
            {
                amplitude: 52,
                frequency: 0.002,
                speed: 0.005,
                phase: Math.PI / 3,
                yOffset: 0.62,
                glowWidth: 5,
                glowColor: 'rgba(13, 148, 136, 0.07)', // Teal glow
                lineWidth: 1.2,
                lineColor: 'rgba(13, 148, 136, 0.45)'
            },
            {
                amplitude: 24,
                frequency: 0.004,
                speed: 0.011,
                phase: Math.PI / 1.5,
                yOffset: 0.53,
                glowWidth: 4,
                glowColor: 'rgba(37, 99, 235, 0.05)', // Blue glow
                lineWidth: 1.0,
                lineColor: 'rgba(37, 99, 235, 0.35)'
            }
        ];

        const drawWaves = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            waves.forEach(wave => {
                // Draw glow outline line
                ctx.beginPath();
                for (let x = 0; x < canvas.width; x += 10) {
                    const y = wave.amplitude * Math.sin(x * wave.frequency + wave.phase) + (canvas.height * wave.yOffset);
                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                const lastY = wave.amplitude * Math.sin(canvas.width * wave.frequency + wave.phase) + (canvas.height * wave.yOffset);
                ctx.lineTo(canvas.width, lastY);

                ctx.strokeStyle = wave.glowColor;
                ctx.lineWidth = wave.glowWidth;
                ctx.stroke();

                // Draw sharp core line
                ctx.strokeStyle = wave.lineColor;
                ctx.lineWidth = wave.lineWidth;
                ctx.stroke();

                // Update wave phase for translation movement
                wave.phase += wave.speed;
            });
        };

        const animate = () => {
            drawWaves();
            animationFrameId = requestAnimationFrame(animate);
        };

        // Initialize
        resizeCanvas();
        animate();

        // Handle resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                cancelAnimationFrame(animationFrameId);
                resizeCanvas();
                animate();
            }, 100);
        });
    }

});
