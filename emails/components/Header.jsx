import { Section, Img, Link } from '@react-email/components';

export function EmailHeader() {
    return (
        <Section style={headerStyle}>
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}`} style={linkStyle}>
                <Img 
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/futech.webp`} 
                        alt="FUTECH" 
                        width="250" 
                        height="95" 
                        style={logoStyle}
                />
            </Link>
    </Section>
    );
}

const headerStyle = {
    backgroundColor: '#0f1114',
    padding: '20px',
    textAlign: 'center',
};

const linkStyle = {
  display: 'inline-block',
  textDecoration: 'none', 
};

const logoStyle = {
    display: 'block',
    margin: '0 auto', 
};