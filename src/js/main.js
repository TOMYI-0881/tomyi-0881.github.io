/**
 * ========================================
 * TEGN Portfolio - Main JavaScript
 * ========================================
 * This file handles all interactive functionality including:
 * - Theme toggle (light/dark mode)
 * - Scroll animations (fade-in effects)
 * - Mobile navigation menu
 * - Smooth scrolling for anchor links
 * - Navbar background effects on scroll
 * - Contact form with EmailJS integration
 * - Custom cursor animation
 * - Toast notifications
 * 
 * @author Thomas Eaton Garcia Navas
 * @version 1.0.0
 * @license MIT
 */

(function() {
    'use strict';

    /**
     * ========================================
     * THEME TOGGLE MODULE
     * ========================================
     * Handles switching between light and dark themes.
     * Persists user preference in localStorage.
     * Updates profile image based on selected theme.
     */
    const initThemeToggle = () => {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        const profileImg = document.querySelector('.hero__profile-img');
        const defaultSrc = "public/img/profile/Thomas_amarillo.jpeg";
        const lightSrc = "public/img/profile/Thomas_morado.jpeg";

        // Update profile image based on theme
        const updateProfileImage = (theme) => {
            if (!profileImg) return;
            profileImg.src = theme === 'light' ? lightSrc : defaultSrc;
        };

        // Restore saved theme from localStorage on page load
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            updateProfileImage(savedTheme);
        }

        // Toggle theme on button click
        themeToggle.addEventListener('click', () => {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateProfileImage(newTheme);
        });
    };

    /**
     * ========================================
     * SCROLL ANIMATIONS MODULE
     * ========================================
     * Uses Intersection Observer to trigger fade-in
     * animations when elements enter the viewport.
     */
    const initScrollAnimations = () => {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        if (!fadeElements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { 
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        fadeElements.forEach((el) => observer.observe(el));
    };

    /**
     * ========================================
     * MOBILE MENU MODULE
     * ========================================
     * Handles hamburger menu toggle for mobile navigation.
     * Animates hamburger lines into X and toggles menu visibility.
     */
    const initMobileMenu = () => {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (!menuBtn || !navLinks) return;

        menuBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('nav-links--open');
            menuBtn.setAttribute('aria-expanded', isOpen);
            
            const spans = menuBtn.querySelectorAll('span');
            if (isOpen) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });

        navLinks.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-links--open');
                menuBtn.setAttribute('aria-expanded', 'false');
                const spans = menuBtn.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            });
        });
    };

    /**
     * ========================================
     * SMOOTH SCROLL MODULE
     * ========================================
     * Enables smooth scrolling when clicking anchor links.
     * Accounts for fixed navbar height.
     */
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    /**
     * ========================================
     * NAVBAR SCROLL MODULE
     * ========================================
     * Adds shadow to navbar when user scrolls past
     * a certain point for better visibility.
     */
    const initNavbarScroll = () => {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            
            if (currentScroll > 50) {
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.boxShadow = 'none';
            }
            
            lastScroll = currentScroll;
        }, { passive: true });
    };

    /**
     * ========================================
     * CONTACT MODAL MODULE
     * ========================================
     * Handles the contact form modal with EmailJS integration.
     * Features:
     * - Modal open/close animations
     * - Form validation (email format)
     * - EmailJS send integration
     * - Toast notifications for success/error feedback
     * - Keyboard support (Escape to close)
     */
    const initContactModal = () => {
        const contactBtn = document.getElementById('contact-btn');
        const modal = document.getElementById('contact-modal');
        const overlay = document.getElementById('modal-overlay');
        const closeBtn = document.getElementById('modal-close');
        const form = document.getElementById('contact-form');

        if (!contactBtn || !modal) return;

        const openModal = () => {
            modal.classList.add('active');
            form.querySelectorAll('.form-group').forEach((el, i) => {
                el.style.animation = 'none';
                el.offsetHeight;
                el.style.animation = `fadeInUp 0.4s ease forwards ${(i + 1) * 0.1}s`;
            });
        };
        const closeModal = () => {
            modal.classList.remove('active');
        };

        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });

        const isValidEmail = (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        };

        const formatDate = () => {
            const now = new Date();
            return now.toLocaleString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        };

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            if (!isValidEmail(email)) {
                alert('Por favor ingresa un correo electrónico válido');
                return;
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Enviando...</span>';
            submitBtn.disabled = true;

            const templateParams = {
                title: 'Nuevo mensaje desde Portfolio',
                name: name,
                time: formatDate(),
                message: message,
                reply_to: email
            };

            try {
                await emailjs.send('service_hxv7vsh', 'template_1k5yiye', templateParams);
                showToast('success', '¡Mensaje enviado!', 'Tu mensaje ha sido enviado correctamente.');
                form.reset();
                closeModal();
            } catch (error) {
                console.error('Error:', error);
                showToast('error', 'Error al enviar', 'Hubo un problema. Intenta de nuevo.');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    };

    /**
     * ========================================
     * TOAST NOTIFICATIONS MODULE
     * ========================================
     * Creates elegant toast notifications for user feedback.
     * Supports success and error types with auto-dismiss.
     * 
     * @param {string} type - 'success' or 'error'
     * @param {string} title - Notification title
     * @param {string} message - Notification message
     */
    const showToast = (type, title, message) => {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        
        const iconPath = type === 'success' 
            ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            : 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
        
        toast.innerHTML = `
            <svg class="toast__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="${iconPath}" />
            </svg>
            <div class="toast__content">
                <div class="toast__title">${title}</div>
                <div class="toast__message">${message}</div>
            </div>
            <button class="toast__close" onclick="this.parentElement.remove()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                </svg>
            </button>
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    };

    /**
     * Initialize all modules
     */
    const init = () => {
        initThemeToggle();
        initScrollAnimations();
        initMobileMenu();
        initSmoothScroll();
        initNavbarScroll();
        initContactModal();
        initCustomCursor();
    };

    /**
     * ========================================
     * CUSTOM CURSOR MODULE
     * ========================================
     * Creates an animated custom cursor that follows
     * the mouse with smooth easing effect.
     * Expands when hovering over clickable elements.
     */
    const initCustomCursor = () => {
        const cursor = document.getElementById('cursor');
        const cursorDot = document.getElementById('cursor-dot');
        
        if (!cursor || !cursorDot) return;

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let dotX = 0, dotY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        document.querySelectorAll('a, button, .nav-link, .project-link, .social-link, label, input, textarea').forEach(el => {
            el.style.cursor = 'none';
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });

        const animate = () => {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            
            dotX += (mouseX - dotX) * 0.3;
            dotY += (mouseY - dotY) * 0.3;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top = dotY + 'px';

            requestAnimationFrame(animate);
        };

        animate();

        document.body.style.cursor = 'none';
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
