// =========================
// CONTACT FORM VALIDATION
// =========================

const form = document.getElementById('contactForm');

if (form) {

    const inputs = form.querySelectorAll(
        'input, textarea'
    );

    // =========================
    // SHOW ERROR
    // =========================

    function showError(input, message) {

        removeError(input);

        const error = document.createElement('small');

        error.className = 'error-message';

        error.innerText = message;

        error.style.color = '#ff4d4f';
        error.style.marginTop = '6px';
        error.style.display = 'block';
        error.style.fontSize = '14px';

        input.style.borderColor = '#ff4d4f';

        input.parentElement.appendChild(error);

    }

    // =========================
    // REMOVE ERROR
    // =========================

    function removeError(input) {

        input.style.borderColor = '';

        const existingError =
            input.parentElement.querySelector(
                '.error-message'
            );

        if (existingError) {

            existingError.remove();

        }

    }

    // =========================
    // VALIDATE EMAIL
    // =========================

    function validateEmail(email) {

        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email);

    }

    // =========================
    // VALIDATE FIELD
    // =========================

    function validateField(input) {

        const value = input.value.trim();

        // Name validation
        if (
            input.type === 'text' &&
            value.length < 2
        ) {

            showError(
                input,
                'Naam moet minimaal 2 karakters bevatten.'
            );

            return false;

        }

        // Email validation
        if (input.type === 'email') {

            if (!validateEmail(value)) {

                showError(
                    input,
                    'Voer een geldig e-mailadres in.'
                );

                return false;

            }

        }

        // Message validation
        if (
            input.tagName === 'TEXTAREA' &&
            value.length < 10
        ) {

            showError(
                input,
                'Bericht moet minimaal 10 karakters bevatten.'
            );

            return false;

        }

        removeError(input);

        return true;

    }

    // =========================
    // REAL-TIME VALIDATION
    // =========================

    inputs.forEach(input => {

        input.addEventListener('input', () => {

            validateField(input);

        });

        input.addEventListener('blur', () => {

            validateField(input);

        });

    });

    // =========================
    // FORM SUBMIT
    // =========================

    form.addEventListener('submit', (e) => {

        e.preventDefault();

        let isValid = true;

        inputs.forEach(input => {

            if (!validateField(input)) {

                isValid = false;

            }

        });

        // =========================
        // SUCCESS
        // =========================

        if (isValid) {

            const submitButton =
                form.querySelector('button');

            submitButton.disabled = true;

            submitButton.innerText =
                'Verzenden...';

            // Simulate backend request
            setTimeout(() => {

                showSuccessMessage();

                form.reset();

                submitButton.disabled = false;

                submitButton.innerText =
                    'Versturen';

            }, 1800);

        }

    });

}

// =========================
// SUCCESS MESSAGE
// =========================

function showSuccessMessage() {

    let existingMessage =
        document.querySelector(
            '.success-message'
        );

    if (existingMessage) {

        existingMessage.remove();

    }

    const success = document.createElement('div');

    success.className = 'success-message';

    success.innerHTML = `
        <strong>
            Bericht succesvol verzonden!
        </strong>
        <p>
            Bedankt voor uw bericht.
            Ik neem zo spoedig mogelijk contact met u op.
        </p>
    `;

    success.style.background =
        'rgba(34,197,94,0.12)';

    success.style.border =
        '1px solid rgba(34,197,94,0.35)';

    success.style.color = '#22c55e';

    success.style.padding = '20px';

    success.style.borderRadius = '12px';

    success.style.marginTop = '25px';

    success.style.animation =
        'fadeIn 5.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';

    const formSection =
        document.querySelector('.contact-form');

    formSection.appendChild(success);

    setTimeout(() => {

        success.remove();

    }, 5000);

}

// =========================
// INPUT FOCUS EFFECT
// =========================

const formInputs =
    document.querySelectorAll(
        '.contact-form input, .contact-form textarea'
    );

formInputs.forEach(input => {

    input.addEventListener('focus', () => {

        input.style.boxShadow =
            '0 0 0 4px rgba(65,105,225,0.12)';

    });

    input.addEventListener('blur', () => {

        input.style.boxShadow = 'none';

    });

});

// =========================
// CHARACTER COUNTER
// =========================

const textarea =
    document.querySelector(
        '.contact-form textarea'
    );

if (textarea) {

    const counter =
        document.createElement('small');

    counter.style.display = 'block';

    counter.style.marginTop = '8px';

    counter.style.color = '#999';

    textarea.parentElement.appendChild(counter);

    textarea.addEventListener('input', () => {

        const length = textarea.value.length;

        counter.innerText =
            `${length} karakters`;

    });

}

// =========================
// ENTER KEY SUPPORT
// =========================

formInputs.forEach(input => {

    input.addEventListener('keypress', (e) => {

        if (
            e.key === 'Enter' &&
            input.tagName !== 'TEXTAREA'
        ) {

            e.preventDefault();

            const formElements =
                Array.from(formInputs);

            const index =
                formElements.indexOf(input);

            if (
                formElements[index + 1]
            ) {

                formElements[index + 1].focus();

            }

        }

    });

});

// =========================
// ACCESSIBILITY
// =========================

formInputs.forEach(input => {

    input.setAttribute(
        'aria-required',
        'true'
    );

});

// =========================
// DEBUGGING
// =========================

console.log(
    '%cForm validation initialized.',
    'color:#D4AF37; font-weight:bold;'
);