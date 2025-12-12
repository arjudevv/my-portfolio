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
    default: "Arjun • Android Developer",
    template: "%s | Arjun",
  },
  description: "Portfolio of Arjun - Android Developer specializing in Kotlin, Java, and Android SDK. Designing and delivering high-quality, user-centric mobile applications with a focus on performance optimization and modern Android development practices.",
  keywords: ["Android Developer", "Kotlin", "Java", "Android SDK", "Mobile Development", "Firebase", "Android Studio", "Mobile Apps"],
  authors: [{ name: "Arjun" }],
  creator: "Arjun",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arjun.dev",
    siteName: "Arjun Portfolio",
    title: "Arjun • Android Developer",
    description: "Portfolio of Arjun - Android Developer specializing in Kotlin, Java, and Android SDK. Designing and delivering high-quality, user-centric mobile applications.",
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
    title: "Arjun • Android Developer",
    description: "Portfolio of Arjun - Android Developer specializing in Kotlin, Java, and Android SDK. Designing and delivering high-quality, user-centric mobile applications.",
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
    jobTitle: "Android Developer",
    url: "https://arjun.dev",
    sameAs: [
      "https://linkedin.com/in/arjun-raju-v",
    ],
    knowsAbout: [
      "Android Development",
      "Kotlin",
      "Java",
      "Android SDK",
      "Firebase",
      "Mobile Development",
      "Android Studio",
      "Performance Optimization",
    ],
  };

  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Always force dark mode
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
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

