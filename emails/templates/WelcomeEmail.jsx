import { EmailLayout } from '../components/Layout';
import { CustomButton } from '../components/Button';
import { Section, Text } from '@react-email/components';

export function WelcomeEmail({ firstName = "User" }) {
  return (
    <EmailLayout title="Registration Completed!">
      <Section>
        
        <Text style={paragraphStyle}>
          Dear {firstName},
        </Text>

        <Text style={paragraphStyle}>
            Welcome to Futech!
        </Text>

        <Text style={paragraphStyle}>
          Thank you for joining our community. We're excited to have you on board.
        </Text>

        <Text style={paragraphStyle}>
          Start exploring our cutting-edge products today!
        </Text>
        
        <CustomButton href={`${process.env.NEXT_PUBLIC_BASE_URL}/products`}>
          Explore Products
        </CustomButton>

      </Section>
    </EmailLayout>
  );
}

const paragraphStyle = {
  fontSize: '16px',
  color: '#666666',
  lineHeight: '1.5',
  marginBottom: '20px',
};