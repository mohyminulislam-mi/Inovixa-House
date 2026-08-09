import './globals.css';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

export const metadata = {
  title: 'Inovixa House | Premium Real Estate Platform',
  description: 'Discover luxury apartments, villas, and commercial spaces with Inovixa House.',
  openGraph: {
    title: 'Inovixa House | Premium Real Estate Platform',
    description: 'Discover luxury apartments, villas, and commercial spaces with Inovixa House.',
    url: 'https://inovixahouse.com',
    siteName: 'Inovixa House',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="flex flex-col min-h-screen">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
