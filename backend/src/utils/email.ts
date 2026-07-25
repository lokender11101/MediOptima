import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter;

// Initialize transporter with Ethereal for local testing
nodemailer.createTestAccount((err: any, account: any) => {
  if (err) {
    console.error('Failed to create a testing account. ' + err.message);
    return process.exit(1);
  }

  console.log('Ethereal Mail Credentials generated:', account.user);

  transporter = nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: {
      user: account.user,
      pass: account.pass
    }
  });
});

export const sendEmail = async (options: { email: string; subject: string; message: string; html?: string }) => {
  if (!transporter) {
    throw new Error('Email transporter not initialized yet');
  }

  const mailOptions = {
    from: '"MediOptima" <noreply@medioptima.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); // Crucial for Ethereal
};
