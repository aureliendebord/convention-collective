import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trouvez votre convention collective',
  description: 'Trouvez votre convention collective en entrant votre numéro SIRET',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8447393342091869"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          defer
          data-domain="trouver-ma-convention-collective.fr"
          src="https://plausible.io/js/script.outbound-links.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-setup" strategy="afterInteractive">
          {`
            window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }
          `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}