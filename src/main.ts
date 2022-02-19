import './tailwind.css';

type FormField = HTMLInputElement | null;

const googleRecaptchaScript = document.getElementById('googleRecaptchaScript');
const contactForm = document.getElementById('contactForm');
googleRecaptchaScript?.setAttribute(
    'src', 
    `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`
);

contactForm?.addEventListener('submit', ($event) => {
    $event.preventDefault();
    grecaptcha.ready(async () => {
        const nameField = document.getElementById('name') as FormField;
        const emailField = document.getElementById('email') as FormField;
        const messageTextarea = document.getElementById('message') as FormField;
        const token = await grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, { action: 'submit' });
        const contactFormApiResponse = await fetch('/.netlify/functions/contactForm', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              name: nameField?.value, 
              email: emailField?.value, 
              message: messageTextarea?.value, 
              token
            }),
        });

        console.log({ json: await contactFormApiResponse.json() })
    });
});