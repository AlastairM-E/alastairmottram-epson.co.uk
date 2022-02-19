import './tailwind.css';

console.log(import.meta.env.VITE_X);

const contact = async () => {
    const contactFormResponse = await fetch('/.netlify/functions/contactForm');
    const contactFormJson = await contactFormResponse.json();

    console.log({ contactFormJson });
}

contact();



