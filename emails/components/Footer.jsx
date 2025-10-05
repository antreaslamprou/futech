import { Section, Text } from '@react-email/components';

export function EmailFooter() {
  return (
    <Section>
      <Text style={footerStyle}>
        Disclaimer: This is purely a fictional company made to showcase my developing skills.
      </Text>
    </Section>
  );
}

const footerStyle = {
  fontSize: '14px',
  color: '#999999',
  marginTop: '30px',
};