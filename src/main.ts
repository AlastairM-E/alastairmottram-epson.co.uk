import './assets/AlastairM-E--2022.03.27--CV.pdf';

type FormField = HTMLInputElement | null;

const googleRecaptchaScript = document.getElementById('googleRecaptchaScript');
const contactForm = document.getElementById('contactForm');

googleRecaptchaScript?.setAttribute('defer', 'true');
googleRecaptchaScript?.setAttribute(
    'src', 
    `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`
);

contactForm?.addEventListener('submit', ($event) => {
  const submitButtonText = document.getElementById('submitButtonText');
  const loadingSpinner = document.getElementById('loadingSpinner');
  submitButtonText?.classList.add('opacity-0')
  loadingSpinner?.classList.remove('hidden');

    $event.preventDefault();
    grecaptcha.ready(async () => {
        const nameField = document.getElementById('name') as FormField;
        const emailField = document.getElementById('email') as FormField;
        const messageTextarea = document.getElementById('message') as FormField;
        const submitContactButton = document.getElementById('submitContactButton');
        const contactSuccessMessage = document.getElementById('contactSuccessMessage');
        const contactErrorMessage = document.getElementById('contactErrorMessage');
        const token = await grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, { action: 'submit' });

        nameField?.setAttribute('disabled', 'true');
        emailField?.setAttribute('disabled', 'true');
        messageTextarea?.setAttribute('disabled', 'true');
        submitContactButton?.setAttribute('disabled', 'true');

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

        const { isEmailSent } = await contactFormApiResponse.json();
        contactForm.classList.add('hidden');

        if (isEmailSent) {
          contactSuccessMessage?.classList.remove('hidden');
        } else {
          contactErrorMessage?.classList.remove('hidden');
        }
    });
});