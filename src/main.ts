type FormField = HTMLInputElement | null;

const googleRecaptchaScript = document.getElementById('googleRecaptchaScript');
const contactForm = document.getElementById('contactForm');
googleRecaptchaScript?.setAttribute('defer', 'true');
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

// <Flex textAlign="left" padding={8} alignItems="center" flexWrap="wrap" height="80%">
// <Center width="100%">
//   <Alert status="error" variant="top-accent">
//     <AlertIcon />
//     <AlertTitle>We are unable to send your message.</AlertTitle>
//   </Alert>
// </Center>
// <Divider marginTop={2} marginBottom={2} borderColor="black" />
// <Text>Please reload the page to try again.</Text>
// <Divider marginTop={2} marginBottom={2} borderColor="black" />
// <Text>
//   If you continue to see this error, contact me by the email address below:
// </Text>
// <UnorderedList>
//   <ListItem>
//     <Link color="blue" href="mailto:alastair.mottram-epson@outlook.com">alastair.mottram-epson@outlook.com</Link>
//   </ListItem>
// </UnorderedList>
// <br />
// <Text>I will get back to you as soon as possible.</Text>
// </Flex>

// <Flex textAlign="left" padding={8} alignItems="center" flexWrap="wrap" height="80%">
// <Center width="100%">
//   <Alert status="success" variant="top-accent">
//     <AlertIcon />
//     <AlertTitle>You have sent your message!</AlertTitle>
//   </Alert>
// </Center>
// <Divider marginTop={2} marginBottom={2} borderColor="black" />
// <Text textAlign="left">
//   Please wait for
//   <strong>
//     {' '}
//     3-4
//     {' '}
//   </strong>
//   working days for a reply.
// </Text>
// <br />
// <Text>If you have not received an email back, please email:</Text>
// <UnorderedList>
//   <ListItem>
//     <Link color="blue" href="mailto:alastair.mottram-epson@outlook.com">alastair.mottram-epson@outlook.com</Link>
//   </ListItem>
// </UnorderedList>
// <Divider marginTop={2} marginBottom={2} borderColor="black" />
// <Text>I will get back to you as soon as possible.</Text>
// </Flex>