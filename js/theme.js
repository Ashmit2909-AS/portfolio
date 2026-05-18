// =========================
// DARK MODE THEME TOGGLE
// =========================

const themeToggle = document.getElementById('themeToggle');

const currentTheme = localStorage.getItem('theme');

// =========================
// APPLY SAVED THEME
// =========================

if (currentTheme === 'dark') {

    document.body.classList.add('dark-mode');

    if (themeToggle) {

        themeToggle.innerHTML = '☀️';

    }

} else {

    document.body.classList.remove('dark-mode');

    if (themeToggle) {

        themeToggle.innerHTML = '🌙';

    }

}

// =========================
// TOGGLE THEME
// =========================

if (themeToggle) {

    themeToggle.addEventListener('click', () => {

        document.body.classList.toggle('dark-mode');

        // =========================
        // SAVE THEME
        // =========================

        if (document.body.classList.contains('dark-mode')) {

            localStorage.setItem('theme', 'dark');

            themeToggle.innerHTML = '☀️';

        } else {

            localStorage.setItem('theme', 'light');

            themeToggle.innerHTML = '🌙';

        }

    });

}

// =========================
// SYSTEM THEME DETECTION
// =========================

const prefersDarkScheme = window.matchMedia(
    '(prefers-color-scheme: dark)'
);

if (!localStorage.getItem('theme')) {

    if (prefersDarkScheme.matches) {

        document.body.classList.add('dark-mode');

        if (themeToggle) {

            themeToggle.innerHTML = '☀️';

        }

    }

}

// =========================
// LISTEN TO SYSTEM CHANGES
// =========================

prefersDarkScheme.addEventListener('change', (e) => {

    if (!localStorage.getItem('theme')) {

        if (e.matches) {

            document.body.classList.add('dark-mode');

            if (themeToggle) {

                themeToggle.innerHTML = '☀️';

            }

        } else {

            document.body.classList.remove('dark-mode');

            if (themeToggle) {

                themeToggle.innerHTML = '🌙';

            }

        }

    }

});

// =========================
// THEME TRANSITION
// =========================

window.addEventListener('DOMContentLoaded', () => {

    document.body.style.transition =
        'background-color 0.3s ease, color 0.3s ease';

});

// =========================
// THEME ICON ANIMATION
// =========================

if (themeToggle) {

    themeToggle.addEventListener('mouseenter', () => {

        themeToggle.style.transform = 'rotate(20deg) scale(1.1)';

    });

    themeToggle.addEventListener('mouseleave', () => {

        themeToggle.style.transform = 'rotate(0deg) scale(1)';

    });

}

// =========================
// OPTIONAL AUTO THEME BASED
// ON TIME OF DAY
// =========================

function applyTimeBasedTheme() {

    const currentHour = new Date().getHours();

    // Dark mode between 7PM and 6AM
    if (
        currentHour >= 19 ||
        currentHour <= 6
    ) {

        if (!localStorage.getItem('theme')) {

            document.body.classList.add('dark-mode');

            if (themeToggle) {

                themeToggle.innerHTML = '☀️';

            }

        }

    }

}

applyTimeBasedTheme();

// =========================
// ACCESSIBILITY LABEL
// =========================

if (themeToggle) {

    themeToggle.setAttribute(
        'aria-label',
        'Schakel tussen licht en donker thema'
    );

}

// =========================
// DEBUGGING
// =========================

console.log(
    '%cTheme system initialized successfully.',
    'color:#4169E1; font-weight:bold;'
);