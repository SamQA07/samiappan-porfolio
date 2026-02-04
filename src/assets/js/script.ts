/**
 * Portfolio Website - Main JavaScript/TypeScript
 * Handles smooth scrolling, scroll animations, and header effects
 */

// ============================================
// Header Scroll Effect
// ============================================
const header = document.querySelector('header');

const handleScroll = (): void => {
    if (window.scrollY > 100) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
};

window.addEventListener('scroll', handleScroll);

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(this: HTMLAnchorElement, e: Event) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        const targetElement = targetId ? document.getElementById(targetId) : null;
        
        if (targetElement) {
            const headerHeight = header?.offsetHeight || 0;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Intersection Observer for Fade-in Animations
// ============================================
const observerOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeInOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
document.querySelectorAll('.content-section').forEach(section => {
    section.classList.add('fade-in-hidden');
    fadeInOnScroll.observe(section);
});

// ============================================
// Animate Elements on Scroll
// ============================================
const animateOnScrollOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '-50px',
    threshold: 0.1
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, animateOnScrollOptions);

// Observe skill cards, experience items, and education cards
document.querySelectorAll('.skill-category, .experience-item, .education-card').forEach(el => {
    animateOnScroll.observe(el);
});

// ============================================
// Typing Effect for Hero Section (Optional Enhancement)
// ============================================
const typeWriter = (element: HTMLElement, text: string, speed: number = 100): void => {
    let i = 0;
    const type = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    type();
};

// ============================================
// Active Navigation Link on Scroll
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const highlightNavOnScroll = (): void => {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = (section as HTMLElement).offsetTop - 150;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', highlightNavOnScroll);

// ============================================
// Mobile Menu Toggle
// ============================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinksContainer?.classList.toggle('active');
    document.body.style.overflow = navLinksContainer?.classList.contains('active') ? 'hidden' : '';
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle?.classList.remove('active');
        navLinksContainer?.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ============================================
// Initialize on DOM Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initial check for header scroll state
    handleScroll();
    
    // Initial check for nav highlighting
    highlightNavOnScroll();
    
    console.log('🚀 Portfolio loaded successfully!');
});