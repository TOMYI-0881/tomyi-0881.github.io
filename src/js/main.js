/**
 * Portfolio - Main JavaScript
 * Author: Thomas Eaton Garcia Navas
 */

(function() {
    'use strict';

    /**
     * Theme Toggle (Light/Dark)
     */
const initThemeToggle = () => {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        const profileImg = document.querySelector('.hero__profile-img');
        const defaultSrc = "public/img/Thomas_amarillo.jpeg";
        const lightSrc = "public/img/Thomas_morado.jpeg";

        const updateProfileImage = (theme) => {
            if (!profileImg) return;
            profileImg.src = theme === 'light' ? lightSrc : defaultSrc;
        };

        // Restore saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            updateProfileImage(savedTheme);
        }

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
     * Intersection Observer for fade-in animations
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
     * Mobile menu toggle functionality
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
     * Smooth scroll for anchor links
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
     * Navbar background on scroll
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
     * Contact Modal with EmailJS
     */
    const initContactModal = () => {
        const contactBtn = document.getElementById('contact-btn');
        const modal = document.getElementById('contact-modal');
        const overlay = document.getElementById('modal-overlay');
        const closeBtn = document.getElementById('modal-close');
        const form = document.getElementById('contact-form');

        if (!contactBtn || !modal) return;

        const openModal = () => modal.classList.add('active');
        const closeModal = () => modal.classList.remove('active');

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
                alert('¡Mensaje enviado correctamente!');
                form.reset();
                closeModal();
            } catch (error) {
                console.error('Error:', error);
                alert(`Error al enviar: ${error.text || error.message}`);
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
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
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
