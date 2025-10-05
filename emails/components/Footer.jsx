import { Section, Text } from '@react-email/components';

export function EmailFooter() {
  return (
    <Section>
        <Text style={bodyStyle}>
            Best Regards,<br/>Futech
        </Text>

        <Text style={footerStyle}>
            Disclaimer: This is purely a fictional company made to showcase my developing skills.
        </Text>
    </Section>
  );
}

const bodyStyle = {
    color: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
}

const footerStyle = {
    fontSize: '14px',
    color: '#999999',
    marginTop: '30px',
};