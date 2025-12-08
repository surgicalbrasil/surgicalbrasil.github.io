// ============================================
// BRUTALIST ANIMATIONS - INTENTIONAL & BOLD
// ============================================

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navCta = document.querySelector('.nav-cta');
const body = document.body;

function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    navCta.classList.toggle('active');
    body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active')) {
        if (!navLinks.contains(e.target) &&
            !navCta.contains(e.target) &&
            !mobileMenuToggle.contains(e.target)) {
            toggleMobileMenu();
        }
    }
});

// Smooth Scrolling with Offset Snap
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect - Bold Border
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.borderBottomWidth = '5px';
        navbar.style.boxShadow = '0 4px 0 var(--accent)';
    } else {
        navbar.style.borderBottomWidth = '3px';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Brutalist Cursor Effect on Interactive Elements
const interactiveElements = document.querySelectorAll('.btn, .feature-card, .pricing-card, .testimonial-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
        document.body.style.cursor = 'pointer';
    });

    el.addEventListener('mouseleave', function() {
        document.body.style.cursor = 'default';
    });
});

// Feature Cards - Snap Hover Effect
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.1s ease-out';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.2s ease-out';
    });
});

// Pricing Cards - Offset Shadow Animation
document.querySelectorAll('.pricing-card').forEach(card => {
    let shadowX = -8;
    let shadowY = -8;

    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate shadow offset based on mouse position
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        shadowX = -4 - ((x - centerX) / centerX) * 4;
        shadowY = -4 - ((y - centerY) / centerY) * 4;

        this.style.boxShadow = `${shadowX}px ${shadowY}px 0 var(--yellow)`;
    });

    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('pricing-featured')) {
            this.style.boxShadow = '';
        }
    });
});

// Testimonial Cards - Rotation on Scroll
const testimonialCards = document.querySelectorAll('.testimonial-card');

function updateTestimonialRotation() {
    const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);

    testimonialCards.forEach((card, index) => {
        if (index === 1) {
            const rotation = -1 + (scrollPercent * 2);
            card.style.transform = `rotate(${rotation}deg)`;
        } else if (index === 2) {
            const rotation = 1 - (scrollPercent * 2);
            card.style.transform = `rotate(${rotation}deg)`;
        }
    });
}

window.addEventListener('scroll', updateTestimonialRotation);

// Waitlist Form - Bold Notification System
const waitlistForm = document.getElementById('waitlistForm');

waitlistForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const emailInput = waitlistForm.querySelector('.email-input');
    const submitButton = waitlistForm.querySelector('.btn');
    const email = emailInput.value;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showBrutalistNotification('Invalid email format', 'error');
        emailInput.style.borderColor = 'var(--accent)';
        emailInput.style.borderWidth = '5px';
        return;
    }

    emailInput.style.borderColor = '';
    emailInput.style.borderWidth = '3px';

    const originalText = submitButton.innerHTML;

    // Loading state
    submitButton.innerHTML = 'ADDING...';
    submitButton.disabled = true;
    submitButton.style.transform = 'translate(0, 0)';

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1200));

        // Success state
        submitButton.innerHTML = 'DONE!';
        submitButton.style.background = 'var(--green)';
        submitButton.style.color = 'var(--black)';
        emailInput.value = '';

        showBrutalistNotification('You\'re on the list!', 'success');

        // Reset after 2 seconds
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
            submitButton.style.color = '';
        }, 2000);

    } catch (error) {
        submitButton.innerHTML = 'RETRY';
        submitButton.disabled = false;
        submitButton.style.background = 'var(--accent)';
        showBrutalistNotification('Something broke. Try again.', 'error');
    }
});

// Brutalist Notification System
function showBrutalistNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.brutal-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const colors = {
        success: 'var(--green)',
        error: 'var(--accent)',
        info: 'var(--blue)'
    };

    const icons = {
        success: '+',
        error: '!',
        info: 'i'
    };

    const notification = document.createElement('div');
    notification.className = 'brutal-notification';
    notification.innerHTML = `
        <div class="brutal-notification-content">
            <span class="brutal-notification-icon">${icons[type]}</span>
            <span class="brutal-notification-message">${message}</span>
            <button class="brutal-notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 30px;
        background: ${colors[type]};
        color: var(--black);
        padding: 1.5rem 2rem;
        border: 5px solid var(--black);
        z-index: 10000;
        font-weight: 800;
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        box-shadow: 8px 8px 0 var(--black);
        animation: brutalistSlideIn 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;

    document.body.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'brutalistSlideOut 0.2s ease-in';
        setTimeout(() => notification.remove(), 200);
    }, 4000);
}

// Add Brutalist Animation Styles
const style = document.createElement('style');
style.textContent = `
    @keyframes brutalistSlideIn {
        from {
            transform: translateX(500px) rotate(5deg);
            opacity: 0;
        }
        to {
            transform: translateX(0) rotate(0deg);
            opacity: 1;
        }
    }

    @keyframes brutalistSlideOut {
        from {
            transform: translateX(0) rotate(0deg);
            opacity: 1;
        }
        to {
            transform: translateX(500px) rotate(-5deg);
            opacity: 0;
        }
    }

    @keyframes glitch {
        0%, 100% {
            transform: translate(0);
        }
        20% {
            transform: translate(-2px, 2px);
        }
        40% {
            transform: translate(2px, -2px);
        }
        60% {
            transform: translate(-2px, -2px);
        }
        80% {
            transform: translate(2px, 2px);
        }
    }

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }

    .brutal-notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .brutal-notification-icon {
        font-weight: 900;
        font-size: 2rem;
        line-height: 1;
    }

    .brutal-notification-message {
        flex: 1;
    }

    .brutal-notification-close {
        background: var(--black);
        color: var(--white);
        border: none;
        width: 32px;
        height: 32px;
        font-size: 2rem;
        cursor: pointer;
        padding: 0;
        font-weight: 900;
        line-height: 1;
        transition: all 0.1s;
    }

    .brutal-notification-close:hover {
        background: var(--accent);
        color: var(--black);
        transform: rotate(90deg);
    }

    /* Glitch effect on hover for certain elements */
    .glitch-on-hover:hover {
        animation: glitch 0.3s;
    }
`;
document.head.appendChild(style);

// Score Animation - Snap to Position
window.addEventListener('load', () => {
    const scoreRing = document.querySelector('.score-ring circle:last-child');
    const scoreValue = document.querySelector('.score-value');

    if (scoreRing && scoreValue) {
        // Start from full circle
        scoreRing.style.strokeDashoffset = '565.48';
        scoreValue.textContent = '0.0';

        // Snap to final value after delay
        setTimeout(() => {
            scoreRing.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            scoreRing.style.strokeDashoffset = '113.1';

            // Animate number
            let current = 0;
            const target = 8.5;
            const duration = 1200;
            const steps = 60;
            const increment = target / steps;
            const stepDuration = duration / steps;

            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    scoreValue.textContent = target.toFixed(1);
                    clearInterval(counter);
                } else {
                    scoreValue.textContent = current.toFixed(1);
                }
            }, stepDuration);
        }, 300);
    }
});

// Intersection Observer for Snap-in Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Unobserve after animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply snap-in animations on scroll
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .step, .pricing-card');

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `opacity 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.05}s, transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.05}s`;

        observer.observe(el);
    });
});

// Add visible class styles
const visibilityStyle = document.createElement('style');
visibilityStyle.textContent = `
    .is-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(visibilityStyle);

// Badge Wiggle on Scroll
const badge = document.querySelector('.badge');
let lastBadgeScroll = 0;

window.addEventListener('scroll', () => {
    if (badge) {
        const currentScroll = window.pageYOffset;
        const scrollDelta = Math.abs(currentScroll - lastBadgeScroll);

        if (scrollDelta > 50 && currentScroll < 500) {
            const randomRotation = -2 + Math.random() * 4;
            badge.style.transform = `rotate(${randomRotation}deg)`;
        }

        lastBadgeScroll = currentScroll;
    }
});

// Stats Counter Animation on Scroll
const stats = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;

            stats.forEach(stat => {
                const text = stat.textContent;
                const hasPlus = text.includes('+');
                const hasDollar = text.includes('$');
                const hasPercent = text.includes('%');

                // Extract number
                const number = parseFloat(text.replace(/[^0-9.]/g, ''));
                const suffix = hasPlus ? '+' : hasPercent ? '%' : '';
                const prefix = hasDollar ? '$' : '';

                let current = 0;
                const duration = 1500;
                const steps = 30;
                const increment = number / steps;
                const stepDuration = duration / steps;

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        stat.textContent = prefix + formatNumber(number) + suffix;
                        clearInterval(counter);
                    } else {
                        stat.textContent = prefix + formatNumber(current) + suffix;
                    }
                }, stepDuration);
            });
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else if (num % 1 !== 0) {
        return num.toFixed(1);
    }
    return num.toString();
}

// Button Click Effect - Offset Shadow
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'translate(2px, 2px)';
        this.style.boxShadow = '-2px -2px 0 currentColor';
    });

    button.addEventListener('mouseup', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
});

// Console Easter Egg - Brutalist Style
console.log('%c█████ PITCHPERFECT █████', 'background: #ff3366; color: #0a0a0a; font-size: 20px; font-weight: 900; padding: 10px; border: 3px solid #0a0a0a;');
console.log('%c▓ Looking at the code? We like your style.', 'color: #ffcc00; font-size: 14px; font-weight: 700;');
console.log('%c▓ We\'re hiring developers who dig brutalism.', 'color: #00cc66; font-size: 14px; font-weight: 700;');
console.log('%c▓ pitchperfect.ai/careers', 'color: #0066ff; font-size: 12px; font-weight: 700;');

// Track important interactions (if analytics is available)
function trackEvent(eventName, params = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, params);
    }
    // Also log to console for debugging
    console.log('📊 Event:', eventName, params);
}

// Track CTA clicks
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', (e) => {
        trackEvent('cta_click', {
            button_text: e.target.textContent.trim(),
            section: e.target.closest('section')?.id || 'unknown'
        });
    });
});

// Track pricing plan interactions
document.querySelectorAll('.pricing-card .btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.pricing-card');
        const planName = card?.querySelector('.pricing-name')?.textContent || 'unknown';

        trackEvent('plan_selected', {
            plan: planName
        });
    });
});

// Email input focus effect
const emailInput = document.querySelector('.email-input');
if (emailInput) {
    emailInput.addEventListener('focus', function() {
        this.style.borderColor = 'var(--black)';
        this.style.borderWidth = '5px';
    });

    emailInput.addEventListener('blur', function() {
        this.style.borderWidth = '3px';
    });
}

// Prevent animations on page load for smoother experience
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});
