// emails/components/Button.jsx
import { Button, Section } from '@react-email/components';

export function CustomButton({ href, children }) {
  return (
    <Section style={buttonWrapperStyle}>
        <Button
        href={href}
        style={buttonStyle}
        >
        {children}
        </Button>
    </Section>
  );
}

const buttonWrapperStyle = {
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const buttonStyle = {
  backgroundColor: '#ffffff',
  color: '#000000',
  padding: '16px 40px',
  borderRadius: '50px',
  textDecoration: 'none',
  display: 'inline-block',
  fontWeight: 'bold',
};