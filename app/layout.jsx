import "styles/globals.css";
import Navbar from 'components/Navbar';
import ClientLayout from 'components/ClientLayout';

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
