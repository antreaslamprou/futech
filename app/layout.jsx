import "styles/globals.css";
import Navbar from 'components/Navbar';
import ClientLayout from 'components/ClientLayout';
import Head from "next/head";
import localFont from 'next/font/local';

export const metadata = {
  title: "Futech",
  description: "Where Smart Tech Meets People",
  icons: {
    icon: '/futech.ico', 
  },
};

const timeburner = localFont({
  src: './fonts/timeburner.ttf',
  variable: '--font-timeburner',
  weight: '400',
  display: 'swap',
});

const ballega = localFont({
  src: './fonts/ballega.otf',
  variable: '--font-ballega',
  weight: '400',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="preload"
          as="image"
          href="/images/black-background.gif"
          type="image/gif"
        />
        <link
          rel="preload"
          as="image"
          href="/images/neuro-lens.webp"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/images/echo-skin.webp"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/images/core-drive.webp"
          type="image/webp"
        />
      </Head>
      <body className={`antialiased ${timeburner.variable} ${ballega.variable}`}>
        <ClientLayout>
          <Navbar />
          <main>
            {children}
          </main>
        </ClientLayout>
      </body>
    </html>
  );
}
