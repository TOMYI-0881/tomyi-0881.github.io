# Project Context

## Overview
- **Project**: TEGN Portfolio - Full Stack Developer Portfolio
- **URL**: https://tomyi-0881.github.io/
- **Contact Email**: gthomasenrique0884@gmail.com

## Structure
```
public/
├── img/
│   ├── profile/       (Thomas_amarillo.jpeg, Thomas_morado.jpeg)
│   ├── technologies/ (Java, Python, JavaScript, React, Docker, etc.)
│   └── projects/     (Gifts.jpg.png)
├── icons/
│   └── playa.png
src/
├── css/
│   ├── layout.css    (theme, toast, custom cursor, hero glow)
│   ├── components.css (modal, form, cards animations)
│   └── responsive.css
└── js/
    └── main.js        (EmailJS, theme toggle, toast, modal)
```

## Key Configurations
- **EmailJS**: publicKey `kh4DEHxPQtIYbT6sY`, service `service_hxv7vsh`, template `template_1k5yiye`
- **Social Links**: GitHub `https://github.com/TOMYI-0881`, LinkedIn `https://www.linkedin.com/in/thomas-garcia-navas-919472363/`
- **Breakpoints**: 576px, 768px, 992px, 1200px, 1400px

## Features Implemented
- Dark/Light theme toggle with animated sun/moon icons
- Custom cursor (desktop only, hidden on touch devices)
- Toast notifications (bottom-right position)
- Profile image swap based on theme
- Modal contact form with animations
- Smooth scrolling & fade-in animations
- Responsive mobile menu

## CSS Variables (layout.css)
- Colors: `--color-primary`, `--color-bg`, `--color-text`, `--color-border`
- Spacing: `--space-sm`, `--space-md`, `--space-xl`, `--space-3xl`
- Typography: `--font-size-sm`, `--font-size-lg`, `--font-weight-medium`

## Important Notes
- `src-light` attribute in HTML for theme-based image swap
- `hero__profile-img` class in JS targets the profile image
- Toast container uses `bottom` and `right` positioning
- Profile images are in `/public/img/profile/`
- Technology images are in `/public/img/technologies/`
- Project images are in `/public/img/projects/`