import { Html, Head, Body, Container } from '@react-email/components';
import { EmailHeader } from './Header';
import { EmailFooter } from './Footer';

export function EmailLayout({ children, title = "Futech" }) {
  return (
    <Html>
      <Head>
        <title>{title}</title>
      </Head>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <EmailHeader />
            {children}
          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle = {
  margin: 0,
  padding: 0,
};

const containerStyle = {
  backgroundColor: '#0f1114',
  color: '#ffffff',
  fontFamily: 'Arial, sans-serif',
  fontSize: '16px',
  maxWidth: '600px',
  margin: '0 auto',
  padding: '0 30px',
  overflow: 'hidden',
};
