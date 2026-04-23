# TEGN Portfolio

Professional portfolio website of Thomas Eaton Garcia Navas - Full Stack Developer.

![Portfolio Preview](https://tomyi-0881.github.io/)

## Overview

This is a modern, responsive portfolio website built with vanilla HTML, CSS, and JavaScript. It showcases my skills, projects, and provides a way for visitors to contact me through a fully integrated contact form.

## Features

### 🎨 Design & UI/UX
- **Dark/Light Theme Toggle** - Smooth transition between themes with animated sun/moon icons
- **Responsive Design** - Fully adapted for mobile, tablet, and desktop devices
- **Custom Cursor** - Animated custom cursor that follows mouse movement
- **Animated Profile Border** - Rotating glowing border around profile image
- **Modal Contact Form** - Elegant popup form with animations
- **Toast Notifications** - Beautiful success/error notifications instead of browser alerts
- **Smooth Scrolling** - Navigation smooth scroll effects
- **Scroll Animations** - Elements fade in as you scroll

### 🛠️ Technologies
- **HTML5** - Semantic and accessible markup
- **CSS3** - Custom properties (variables), Grid, Flexbox, Animations
- **JavaScript** - Vanilla JS with modern ES6+ features
- **EmailJS** - Email service integration for contact form

### 📱 Responsive Breakpoints
- Mobile: < 576px
- Tablet: 576px - 991px
- Desktop: ≥ 992px
- Large Desktop: ≥ 1200px
- Extra Large: ≥ 1400px

## Project Structure

```
Portfolio/
├── public/
│   ├── icons/
│   │   └── playa.png
│   └── img/
│       ├── Thomas_amarillo.jpeg
│       ├── Thomas_morado.jpeg
│       ├── java.png
│       ├── Python.png
│       ├── javaScript.png
│       └── ... (other skill images)
├── src/
│   ├── css/
│   │   ├── animations.css
│   │   ├── base.css
│   │   ├── components.css
│   │   ├── layout.css
│   │   ├── responsive.css
│   │   └── utilities.css
│   └── js/
│       └── main.js
├── index.html
├── README.md
└── LICENSE
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/TOMYI-0881/portfolio.git
```

2. Open `index.html` in your browser or use a local server:

**GitHub Pages:** https://tomyi-0881.github.io/

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

## Configuration

### EmailJS Setup

The contact form uses EmailJS. To configure:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Add your email service (Gmail, Outlook, etc.)
3. Create an email template
4. Update the configuration in `src/js/main.js`:

```javascript
emailjs.init('YOUR_PUBLIC_KEY');
// ...
await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
```

### Theme Customization

Edit CSS variables in `src/css/base.css`:

```css
:root {
  /* Colors */
  --color-bg-primary: #0a0a0f;
  --color-bg-secondary: #16161d;
  --color-accent: #6366f1;
  /* ... */
}
```

## Sections

1. **Hero** - Introduction with animated profile
2. **Skills** - Programming languages (Java, Python, JavaScript)
3. **Technologies** - Frameworks and tools (React, Spring Boot, etc.)
4. **Databases** - Database skills (PostgreSQL, MongoDB)
5. **Projects** - Featured projects with links
6. **Contact** - Modal form for sending messages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- Email: gthomasenrique0884@gmail.com
- GitHub: https://github.com/TOMYI-0881
- LinkedIn: [Thomas Garcia Navas](https://www.linkedin.com/in/thomas-garc%C3%ADa-navas-919472363/)

---

Built with ❤️ by Thomas Eaton Garcia Navas