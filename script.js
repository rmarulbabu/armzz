// Birthday Countdown App JavaScript
class BirthdayCountdown {
    constructor() {
        // Target dates
        this.targetDate = new Date('2025-10-10T00:00:00').getTime();
        this.heartzDayStartDate = new Date('2025-08-21T20:00:00').getTime();
        
        // State
        this.isCountdownFinished = false;
        this.heartParticles = [];
        
        // DOM elements
        this.initializeElements();
        
        // Start the app
        this.init();
    }
    
    initializeElements() {
        // Countdown elements
        this.countdownDays = document.getElementById('countdownDays');
        this.countdownHours = document.getElementById('countdownHours');
        this.countdownMinutes = document.getElementById('countdownMinutes');
        this.countdownSeconds = document.getElementById('countdownSeconds');
        
        // Heartzday elements
        this.heartzDays = document.getElementById('heartzDays');
        this.heartzHours = document.getElementById('heartzHours');
        this.heartzMinutes = document.getElementById('heartzMinutes');
        this.heartzSeconds = document.getElementById('heartzSeconds');
        
        // Portrait elements
        this.portraitFrame = document.getElementById('portraitFrame');
        this.portraitOverlay = document.getElementById('portraitOverlay');
        this.heartfallContainer = document.getElementById('heartfallContainer');
        
        // Heart particles container
        this.heartParticlesContainer = document.getElementById('heartParticles');
    }
    
    init() {
        // Generate heart particles for ambient animation
        this.generateHeartParticles();
        
        // Start the timers
        this.startTimers();
        
        // Set initial portrait state
        this.updatePortraitState();
    }
    
    generateHeartParticles() {
        // Generate floating heart particles
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'heartparticle-drift';
            particle.textContent = '♥';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.fontSize = (Math.random() * 20 + 10) + 'px';
            particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            this.heartParticlesContainer.appendChild(particle);
        }
    }
    
    startTimers() {
        // Update timers immediately
        this.updateTimers();
        
        // Update every second
        setInterval(() => {
            this.updateTimers();
        }, 1000);
    }
    
    updateTimers() {
        const now = new Date().getTime();
        
        // Update countdown timer
        this.updateCountdown(now);
        
        // Update Heartzday timer
        this.updateHeartzDay(now);
    }
    
    updateCountdown(now) {
        const countdownDistance = this.targetDate - now;
        
        if (countdownDistance > 0) {
            const days = Math.floor(countdownDistance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((countdownDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((countdownDistance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((countdownDistance % (1000 * 60)) / 1000);
            
            this.countdownDays.textContent = this.formatTime(days);
            this.countdownHours.textContent = this.formatTime(hours);
            this.countdownMinutes.textContent = this.formatTime(minutes);
            this.countdownSeconds.textContent = this.formatTime(seconds);
        } else {
            // Countdown finished
            this.countdownDays.textContent = '00';
            this.countdownHours.textContent = '00';
            this.countdownMinutes.textContent = '00';
            this.countdownSeconds.textContent = '00';
            
            if (!this.isCountdownFinished) {
                this.isCountdownFinished = true;
                this.revealPortrait();
                this.triggerHeartfall();
            }
        }
    }
    
    updateHeartzDay(now) {
        const heartzDayDistance = now - this.heartzDayStartDate;
        
        if (heartzDayDistance > 0) {
            const days = Math.floor(heartzDayDistance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((heartzDayDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((heartzDayDistance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((heartzDayDistance % (1000 * 60)) / 1000);
            
            this.heartzDays.textContent = this.formatTime(days);
            this.heartzHours.textContent = this.formatTime(hours);
            this.heartzMinutes.textContent = this.formatTime(minutes);
            this.heartzSeconds.textContent = this.formatTime(seconds);
        } else {
            // Heartzday hasn't started yet
            this.heartzDays.textContent = '00';
            this.heartzHours.textContent = '00';
            this.heartzMinutes.textContent = '00';
            this.heartzSeconds.textContent = '00';
        }
    }
    
    updatePortraitState() {
        if (this.isCountdownFinished) {
            this.portraitFrame.classList.add('revealed');
            this.portraitFrame.classList.remove('blurred');
        } else {
            this.portraitFrame.classList.add('blurred');
            this.portraitFrame.classList.remove('revealed');
        }
    }
    
    revealPortrait() {
        this.portraitFrame.classList.add('revealed');
        this.portraitFrame.classList.remove('blurred');
        this.portraitFrame.classList.add('heartlight-glow');
    }
    
    triggerHeartfall() {
        // Create heartfall animation
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heartfall';
                heart.textContent = '♥';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.animationDelay = Math.random() * 3 + 's';
                heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
                heart.style.color = `hsl(${Math.random() * 60 + 300}, 70%, 60%)`;
                
                this.heartfallContainer.appendChild(heart);
                
                // Remove heart after animation
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 4000);
            }, Math.random() * 2000);
        }
        
        // Hide heartfall container after animation
        setTimeout(() => {
            this.heartfallContainer.style.display = 'none';
        }, 5000);
    }
    
    formatTime(time) {
        return String(time).padStart(2, '0');
    }
    
    // Utility method to check if countdown is finished (for testing)
    isFinished() {
        return this.isCountdownFinished;
    }
    
    // Method to manually trigger countdown finish (for testing)
    triggerFinish() {
        if (!this.isCountdownFinished) {
            this.isCountdownFinished = true;
            this.revealPortrait();
            this.triggerHeartfall();
            
            // Update display
            this.countdownDays.textContent = '00';
            this.countdownHours.textContent = '00';
            this.countdownMinutes.textContent = '00';
            this.countdownSeconds.textContent = '00';
        }
    }
}

// Enhanced animations and interactions
class AnimationManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Add smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Add intersection observer for fade-in animations
        this.setupIntersectionObserver();
        
        // Add click effects
        this.setupClickEffects();
        
        // Add keyboard navigation
        this.setupKeyboardNavigation();
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe animated elements
        const animatedElements = document.querySelectorAll('.timer-card, .heartzday-card, .message-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    setupClickEffects() {
        // Add ripple effect to clickable elements
        const clickableElements = document.querySelectorAll('.social-link, .timer-box, .heartzday-box');
        
        clickableElements.forEach(element => {
            element.addEventListener('click', (e) => {
                const ripple = document.createElement('div');
                const rect = element.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(244, 63, 94, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                element.style.position = 'relative';
                element.style.overflow = 'hidden';
                element.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setupKeyboardNavigation() {
        // Improve keyboard navigation
        const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid #f43f5e';
                element.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', () => {
                element.style.outline = '';
                element.style.outlineOffset = '';
            });
        });
    }
}

// Error Handler
class ErrorHandler {
    constructor() {
        this.setupErrorHandling();
    }
    
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Application error:', e.error);
            this.showFallback();
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.showFallback();
        });
    }
    
    showFallback() {
        const fallback = document.createElement('div');
        fallback.className = 'error-fallback';
        fallback.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #fee2e2;
                color: #dc2626;
                padding: 1rem;
                border-radius: 0.5rem;
                border: 1px solid #fecaca;
                z-index: 1000;
                max-width: 300px;
            ">
                <strong>Notice:</strong> Some animations may not work properly. 
                The countdown timers should still function normally.
            </div>
        `;
        
        document.body.appendChild(fallback);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (fallback.parentNode) {
                fallback.parentNode.removeChild(fallback);
            }
        }, 5000);
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize main countdown app
        window.birthdayCountdown = new BirthdayCountdown();
        
        // Initialize animation manager
        window.animationManager = new AnimationManager();
        
        // Initialize error handler
        window.errorHandler = new ErrorHandler();
        
        console.log('🎉 Birthday Countdown App initialized successfully!');
        
        // Add development helpers (remove in production)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            window.triggerFinish = () => window.birthdayCountdown.triggerFinish();
            console.log('Development mode: Use triggerFinish() to test countdown completion');
        }
        
    } catch (error) {
        console.error('Failed to initialize Birthday Countdown App:', error);
        
        // Show basic fallback
        document.body.innerHTML = `
            <div style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                text-align: center;
                font-family: Arial, sans-serif;
                background: linear-gradient(135deg, #fce7f3, #fdf2f8);
                padding: 2rem;
            ">
                <h1 style="color: #1f2937; margin-bottom: 1rem;">ARL & AMZ Birthday Countdown</h1>
                <p style="color: #6b7280; margin-bottom: 2rem;">Birthday: October 10, 2025</p>
                <p style="color: #6b7280; margin-bottom: 2rem;">Heartzday: August 21, 2025, 8:00 PM</p>
                <p style="color: #ef4444;">The interactive features are temporarily unavailable, but our love remains eternal! ❤️</p>
            </div>
        `;
    }
});