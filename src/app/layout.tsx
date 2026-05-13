// 'use client'

import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: 'Onyx Dental Center | Klinik Gigi Jakarta — Veneer & Invisalign',
  description: 'Onyx Dental Center, klinik gigi spesialis veneer, Invisalign, dan smile makeover di Jakarta. Konsultasi dengan dokter gigi berpengalaman.',
  metadataBase: new URL('https://onyxdentalcenter.id'),
};
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CustomFonts } from "./fonts/custom-fonts";
import { getSettings } from "@/lib/api";
import Script from "next/script";
import PixelProviders from "@/lib/utils/pixel";
import { Suspense } from "react";
// import { PageWrapper } from "@/components";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const settings = await getSettings()
  const pixelId = 3800209303610125;

  return (
    <html lang="id">
      <head>
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["Dentist", "LocalBusiness"],
                  "@id": "https://onyxdentalcenter.id/#business",
                  "name": "Onyx Dental Center",
                  "description": "Jakarta's premier smile studio specializing in veneers, Invisalign, and smile makeovers.",
                  "url": "https://onyxdentalcenter.id/",
                  "logo": "https://onyxdentalcenter.id/logo.webp",
                  "image": "https://onyxdentalcenter.id/assets/images/home-section1.webp",
                  "telephone": "+62-812-8663-2240",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Ruko Asia Millenium, Jl. Taman Permata No.65 Blok C-1",
                    "addressLocality": "Binong, Kec. Curug",
                    "addressRegion": "Banten",
                    "postalCode": "15811",
                    "addressCountry": "ID"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": -6.238,
                    "longitude": 106.660
                  },
                  "openingHoursSpecification": [
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
                      "opens": "09:00",
                      "closes": "20:00"
                    },
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": "Saturday",
                      "opens": "09:00",
                      "closes": "20:00"
                    },
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": "Sunday",
                      "opens": "10:00",
                      "closes": "20:00"
                    }
                  ],
                  "priceRange": "Rp 1.000.000 - Rp 20.000.000",
                  "currenciesAccepted": "IDR",
                  "paymentAccepted": "Cash, Credit Card, Transfer",
                  "medicalSpecialty": "Dentistry",
                  "availableService": [
                    { "@type": "MedicalProcedure", "name": "Veneer Gigi" },
                    { "@type": "MedicalProcedure", "name": "Invisalign" },
                    { "@type": "MedicalProcedure", "name": "Smile Makeover" },
                    { "@type": "MedicalProcedure", "name": "Teeth Whitening" },
                    { "@type": "MedicalProcedure", "name": "Dental Implant" }
                  ],
                  "sameAs": [
                    "https://www.instagram.com/onyxdentalcenter/",
                    "https://www.tiktok.com/@onyxdentalcenter",
                    "https://www.youtube.com/@onyxdentalcenter",
                    "https://www.facebook.com/onyxdentalcenter/"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://onyxdentalcenter.id/#website",
                  "url": "https://onyxdentalcenter.id/",
                  "name": "Onyx Dental Center",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://onyxdentalcenter.id/blogs?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
            })
          }}
        />
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5P470BH13Q"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5P470BH13Q');
          `}
        </Script>
        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M685TJBG');
          `}
        </Script>

        {/* Facebook Meta Pixel */}
        <Script
          id="fb-pixel-base"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixelId}');
fbq('track', 'PageView');
                `,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </head>
      <body
        className={`${ebGaramond.variable} ${CustomFonts.variable} antialiased bg-white font-helvetica`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M685TJBG"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Navbar settings={settings.data} />
        <main className="min-h-screen">
          <Suspense fallback={null}>
            <PixelProviders>
              {children}
            </PixelProviders>
          </Suspense>
        </main>
        <Footer settings={settings.data} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
