
import nodemailer from 'nodemailer';

interface EmailMessage {
  name: string;
  email: string;
  message: string;
}

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abiolaplays@gmail.com', // Your email
    pass: process.env.EMAIL_PASSWORD, // Password should be stored as an environment variable
  },
});

export async function sendContactEmail(messageData: EmailMessage): Promise<boolean> {
  try {
    const mailOptions = {
      from: 'Portfolio Contact Form <abiolaplays@gmail.com>',
      to: 'abiolaplays@gmail.com',
      subject: `New Contact Message from ${messageData.name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${messageData.name}</p>
        <p><strong>Email:</strong> ${messageData.email}</p>
        <p><strong>Message:</strong></p>
        <p>${messageData.message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: messageData.email,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}
