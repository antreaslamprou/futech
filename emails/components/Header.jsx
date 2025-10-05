import { Section, Img } from '@react-email/components';

export function EmailHeader() {
  return (
    <Section style={headerStyle}>
      <Img 
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/futech.webp`} 
        alt="FUTECH" 
        width="200" 
        height="60" 
      />
    </Section>
  );
}

const headerStyle = {
  backgroundColor: '#0f1114',
  padding: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};