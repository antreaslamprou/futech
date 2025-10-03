import "styles/globals.css";
import Navbar from 'components/Navbar';
import ClientLayout from 'components/ClientLayout';
import Head from "next/head";

export const metadata = {
  title: "Futech",
  description: "Where Smart Tech Meets People",
  icons: {
    icon: '/futech.ico', 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="preload"
          href="/fonts/Timeburner.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Ballega.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="image"
          href="/images/NeuroLens.webp"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/images/EchoSkin.webp"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/images/CoreDrive.webp"
          type="image/webp"
        />
      </Head>
      <body className="antialiased">
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
