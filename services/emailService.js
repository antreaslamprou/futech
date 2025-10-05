import transporter from '@/lib/mailer';
import { renderEmail } from '@/lib/emailRenderer';

// Fallback email templates for html emails
const EMAIL_TEMPLATES = {
  welcome: {
    subject: () => `Welcome to Futech! Your registration is complete.`,
    text: (data) => `Welcome to Futech, ${data.firstName}! Thank you for joining our community.`,
  },
  orderConfirmation: {
    subject: (data) => `Your order is confirmed.`,
    text: (data) => `Thank you for your order #${data.orderId}.`,
  },
  passwordReset: {
    subject: () => 'Password reset request.',
    text: (data) => `Click here to reset your password: ${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${data.token}`,
  }
};

export async function sendEmail(templateName, userEmail, data = {}) {
  try {
    const template = EMAIL_TEMPLATES[templateName];
    
    if (!template) {
      throw new Error(`Email template "${templateName}" not found`);
    }

    const html = await renderEmail(templateName, data);
    
    const result = await transporter.sendMail({
      from: `Futech <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: template.subject(data),
      html: html,
      text: template.text(data),
    });

    console.log(`${templateName} email sent to:`, userEmail);
    return result;
  } catch (error) {
    console.error(`Error sending ${templateName} email:`, error);
    throw error;
  }
}

// Keep individual functions for convenience
export const sendWelcomeEmail = (userEmail, firstName) => 
  sendEmail('welcome', userEmail, { firstName });

export const sendOrderConfirmation = (userEmail, firstName, orderData) => 
  sendEmail('orderConfirmation', userEmail, { 
    firstName: firstName,
    orderData: orderData
  });

export const sendPasswordReset = (userEmail, token) => 
  sendEmail('passwordReset', userEmail, { token });