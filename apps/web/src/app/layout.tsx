import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://arjun.dev'),
  title: {
    default: "Arjun • Full Stack Developer",
    template: "%s | Arjun",
  },
  description: "Portfolio of Arjun - Full Stack Developer specializing in Web, Android, and Backend development. Building modern applications with cutting-edge technologies.",
  keywords: ["Full Stack Developer", "Web Development", "Android Development", "Backend Development", "React", "Next.js", "Node.js"],
  authors: [{ name: "Arjun" }],
  creator: "Arjun",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arjun.dev",
    siteName: "Arjun Portfolio",
    title: "Arjun • Full Stack Developer",
    description: "Portfolio of Arjun - Full Stack Developer specializing in Web, Android, and Backend development.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Arjun Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arjun • Full Stack Developer",
    description: "Portfolio of Arjun - Full Stack Developer specializing in Web, Android, and Backend development.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Arjun",
    jobTitle: "Full Stack Developer",
    url: "https://arjun.dev",
    sameAs: [
      "https://github.com/arjun",
      "https://linkedin.com/in/arjun",
    ],
    knowsAbout: [
      "Web Development",
      "Android Development",
      "Backend Development",
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
    ],
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = stored || (prefersDark ? 'dark' : 'light');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
        <link rel="canonical" href="https://arjun.dev" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

