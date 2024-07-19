import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BookManager',
  description: 'Tus Libros a un Clic',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="public\iconoapp.png" /> 
      </Head>
      <body className={inter.className}>
        <nav>
        <div className="logoContainer">
        <Image 
          src="/logoBook.png" 
          alt="Logo" 
          width={60}
          height={60}
          style={{ borderRadius: '50%' }} 
        />

        <h1>Tus Libros a un Click</h1>
      </div>
          <ul>
              <Link href="/">Inicio</Link>
          </ul>
        </nav>
        <br />
        {children}
        <footer>
          <div className="footer-content">
            <p>&copy; 2024 Tus Libros a un Click. Todos los derechos reservados.</p>
            <ul>
              <li><Link href="/about">Sobre Nosotros</Link></li>
              <li><Link href="/privacy">Política de Privacidad</Link></li>
              <li><Link href="/terms">Términos de Servicio</Link></li>
            </ul>
            <div className="footer-social">
              <a href="mailto:av6135@gmail.com" target="_blank" rel="noopener noreferrer">
                <i></i> 📧Correo
              </a>
              <a href="https://wa.me/qr/J6PZJ6S3AP2BK1" target="_blank" rel="noopener noreferrer">
                <i></i>📲 WhatsApp
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
