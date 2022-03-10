import { Handler } from "@netlify/functions";
import axios from "axios";
import sgMail from "@sendgrid/mail";

interface RecaptchaInterface {
  data: {
    success: boolean;
    score: number;
  };
}

const handler: Handler = async ($event, context) => {
  if ($event.httpMethod !== "POST") {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Only POST queries" }),
    };
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const PASSING_USER_SCORE = 0.7;
  const { name, email, message, token } = JSON.parse($event.body);
  const msg = {
    to: "alastair.me.opensource@gmail.com",
    from: "alastair.mottram-epson@outlook.com",
    subject: "alastairmottram-epson.co.uk query",
    text: `
    Name: ${name},
    Email: ${email},
    Message: ${message}
  `,
  };

  try {
    const recapatcha: RecaptchaInterface = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    );

    if (
      recapatcha.data.success &&
      recapatcha.data.score >= PASSING_USER_SCORE
    ) {
      await sgMail.send(msg);

      return {
        statusCode: 200,
        body: JSON.stringify({ isEmailSent: true }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ isEmailSent: false }),
    };
  }
};

export { handler };
