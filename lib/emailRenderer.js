import { render } from '@react-email/render';
import { WelcomeEmail, OrderConfirmationEmail, PasswordResetEmail } from '@/emails';

const templates = {
  welcome: WelcomeEmail,
};

export async function renderEmail(templateName, props = {}) {
  const EmailComponent = templates[templateName];
  
  if (!EmailComponent) {
    throw new Error(`Email template "${templateName}" not found`);
  }

  const html = await render(<EmailComponent {...props} />);
  return html;
}