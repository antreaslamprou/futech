import { EmailLayout } from '../components/Layout';
import { CustomButton } from '../components/Button';
import { Section, Text } from '@react-email/components';

export function PasswordResetEmail({ token }) {
  return (
    <EmailLayout title="Forgot Your Password">
      <Section>
        
        <Text style={paragraphStyle}>
          Dear User,
        </Text>

        <Text style={paragraphStyle}>
            It looks like someone requested a password reset for your account.
        </Text>

        <Text style={paragraphStyle}>
          Please note that this link is active for only 15 minutes, after the expiration date another reset link will need to be created.
        </Text>
        
        <CustomButton href={`${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`}>
          Reset Password
        </CustomButton>

        <Text style={paragraphStyle}>
          If this wasn't you please ignore this email.
        </Text>

      </Section>
    </EmailLayout>
  );
}

const paragraphStyle = {
  fontSize: '16px',
  lineHeight: '1.5',
};