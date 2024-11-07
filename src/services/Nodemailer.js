import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Add your email in the .env file
    pass: process.env.EMAIL_PASS, // Add your email password or app-specific password
  },
});

export const sendNewsletter = async (to, subject, htmlContent) => {
  try {
    // Setup email data
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to, // Receiver address (can be a list of recipients separated by commas)
      subject, // Subject line
      html: htmlContent, // HTML body content
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Error sending email: ', error);
    return {
      success: false,
      error: error.message,
    };
  }
};
