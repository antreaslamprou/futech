import { Section, Text } from '@react-email/components';

export function EmailFooter() {
    return (
        <Section>
            <Text style={regardsStyle}>
                Best Regards,
            </Text>

            <Text style={companyStyle}>
                Futech
            </Text>

            <Text style={disclaimerStyle}>
                Disclaimer: This is a purely fictional company made to showcase my developing skills. No services or products will be provided.
            </Text>
        </Section>
    );
}


const regardsStyle = {
  fontSize: '16px',
};

const companyStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
};

const disclaimerStyle = {
    fontSize: '14px',
    color: '#999999',
    margin: '30px 0',
};