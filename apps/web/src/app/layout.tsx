import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { AppProviders } from '@/components/providers/AppProviders';
import { SITE_URL } from '@/lib/site-url';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Arjun • Senior Android Developer',
    template: '%s | Arjun',
  },
  description:
    'Portfolio of Arjun - Senior Android Developer specializing in Kotlin, Jetpack Compose, Clean Architecture, Firebase, and full-stack mobile development.',
  keywords: [
    'Android Developer',
    'Senior Android Developer',
    'Kotlin',
    'Jetpack Compose',
    'Clean Architecture',
    'Firebase',
    'Node.js',
    'AWS',
    'Mobile Development',
  ],
  authors: [{ name: 'Arjun' }],
  creator: 'Arjun',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Arjun Portfolio',
    title: 'Arjun • Senior Android Developer',
    description:
      'Interactive portfolio of Arjun - Senior Android Developer building mobile apps, backend systems, and scalable products.',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Arjun Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arjun • Senior Android Developer',
    description: 'Interactive portfolio of Arjun - Senior Android Developer.',
    images: ['/og-image.svg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Arjun',
    jobTitle: 'Senior Android Developer',
    url: SITE_URL,
    sameAs: ['https://linkedin.com/in/arjun-raju-v', 'https://github.com/arjun-raju-v'],
    knowsAbout: [
      'Android Development',
      'Kotlin',
      'Jetpack Compose',
      'Clean Architecture',
      'Firebase',
      'Node.js',
      'AWS',
      'PostgreSQL',
      'Docker',
      'CI/CD',
    ],
  };

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('dark');`,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-background text-text`}>
        <AppProviders>{children}</AppProviders>
        <Analytics />
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
