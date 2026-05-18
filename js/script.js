// =========================
// MOBILE NAVIGATION
// =========================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {

    navMenu.classList.toggle('active');

    if (navMenu.classList.contains('active')) {

        hamburger.innerHTML = '✕';

    } else {

        hamburger.innerHTML = '☰';

    }

});

// =========================
// CLOSE MOBILE MENU
// =========================

document.querySelectorAll('.nav-menu a').forEach(link => {

    link.addEventListener('click', () => {

        navMenu.classList.remove('active');
        hamburger.innerHTML = '☰';

    });

});

// =========================
// STICKY HEADER SHADOW
// =========================

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {

    if (window.scrollY > 50) {

        header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';

    } else {

        header.style.boxShadow = 'none';

    }

});

// =========================
// ACTIVE NAVIGATION LINKS
// =========================

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {

    let current = '';

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute('id');

        }

    });

    navLinks.forEach(link => {

        link.classList.remove('active');

        if (link.getAttribute('href').includes(current)) {

            link.classList.add('active');

        }

    });

});

// =========================
// REVEAL ANIMATIONS
// =========================

const revealElements = document.querySelectorAll(
    '.skill-card, .project-card, .timeline-item, .edu-card, .stat-card'
);

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('reveal', 'active');

            }

        });

    },

    {
        threshold: 0.15
    }

);

revealElements.forEach(element => {

    revealObserver.observe(element);

});

// =========================
// SMOOTH SCROLL OFFSET
// =========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (!target) return;

        const offset = 80;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            offset;

        window.scrollTo({

            top: targetPosition,
            behavior: 'smooth'

        });

    });

});

// =========================
// SCROLL PROGRESS BAR
// =========================

const progressBar = document.createElement('div');

progressBar.classList.add('scroll-indicator');

document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {

    const scrollTop = window.scrollY;

    const docHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const scrollPercent = (scrollTop / docHeight) * 100;

    progressBar.style.width = `${scrollPercent}%`;

});

// =========================
// HERO TYPING EFFECT
// =========================

const heroTitle = document.querySelector('.hero-content h1');

if (heroTitle) {

    const originalText = heroTitle.textContent.trim().replace(/\s+/g, ' ');

    heroTitle.textContent = '';

    let index = 0;

    function typeEffect() {

        if (index < originalText.length) {

            heroTitle.textContent += originalText.charAt(index);

            index++;

            setTimeout(typeEffect, 60);

        }

    }

    window.addEventListener('load', () => {

        typeEffect();

    });

}

// =========================
// COUNTER ANIMATION
// =========================

const counters = document.querySelectorAll('.stat-card h3');

const speed = 200;

counters.forEach(counter => {

    const animateCounter = () => {

        const targetText = counter.innerText;

        const target = parseInt(targetText);

        if (isNaN(target)) return;

        let count = 0;

        const updateCount = () => {

            const increment = target / speed;

            if (count < target) {

                count += increment;

                counter.innerText = Math.ceil(count) + '+';

                requestAnimationFrame(updateCount);

            } else {

                counter.innerText = target + '+';

            }

        };

        updateCount();

    };

    const counterObserver = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    animateCounter();

                    counterObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.5
        }

    );

    counterObserver.observe(counter);

});

// =========================
// LAZY LOAD IMAGES
// =========================

const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const img = entry.target;

                img.src = img.dataset.src;

                img.removeAttribute('data-src');

                observer.unobserve(img);

            }

        });

    }

);

lazyImages.forEach(img => {

    imageObserver.observe(img);

});

// =========================
// PARALLAX HERO EFFECT
// =========================

window.addEventListener('scroll', () => {

    const hero = document.querySelector('.hero');

    if (!hero) return;

    const scrollPosition = window.scrollY;

    hero.style.backgroundPositionY = `${scrollPosition * 0.4}px`;

});

// =========================
// KEYBOARD ACCESSIBILITY
// =========================

document.addEventListener('keydown', (e) => {

    if (e.key === 'Escape') {

        navMenu.classList.remove('active');
        hamburger.innerHTML = '☰';

    }

});

// =========================
// CONTACT FORM SUCCESS
// =========================

const contactForm = document.getElementById('contactForm');

if (contactForm) {

    contactForm.addEventListener('submit', (e) => {

        e.preventDefault();

        alert(
            'Uw bericht is succesvol verzonden!'
        );

        contactForm.reset();

    });

}

// =========================
// CURRENT YEAR FOOTER
// =========================

const footerYear = document.querySelector('.footer-year');

if (footerYear) {

    footerYear.innerText = new Date().getFullYear();

}

// =========================
// PAGE LOADED ANIMATION
// =========================

window.addEventListener('load', () => {

    document.body.classList.remove('loading');

});

// =========================
// CONSOLE BRANDING
// =========================

console.log(
    '%cPortfolio Developed for Ashmit Maharban',
    'color:#4169E1; font-size:16px; font-weight:bold;'
);

console.log(
    '%cSOC Engineering • Operations • Recruitment • Business Support',
    'color:#D4AF37; font-size:12px;'
);