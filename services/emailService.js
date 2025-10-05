import transporter from '@/lib/mailer';
import { renderEmail } from '@/lib/emailRenderer';

// Fallback email templates for html emails
const EMAIL_TEMPLATES = {
  welcome: {
    subject: () => `Welcome to Futech! Your registration is complete`,
    text: (data) => `Welcome to Futech, ${data.firstName}! Thank you for joining our community.`,
  },
  orderConfirmation: {
    subject: (data) => `Order Confirmation #${data.orderId}`,
    text: (data) => `Thank you for your order #${data.orderId}. Total: $${data.total}`,
  },
  passwordReset: {
    subject: () => 'Password Reset Request',
    text: (data) => `Click here to reset your password: ${data.resetUrl}`,
  },
  contactForm: {
    subject: (data) => `New Contact Form: ${data.subject}`,
    text: (data) => `New message from ${data.name} (${data.email}): ${data.message}`,
  },
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

export const sendOrderConfirmation = (userEmail, orderData) => 
  sendEmail('orderConfirmation', userEmail, orderData);

export const sendPasswordReset = (userEmail, resetData) => 
  sendEmail('passwordReset', userEmail, resetData);