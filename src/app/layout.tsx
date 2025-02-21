import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI Text Processing Interface",
  description: "AI Text Processing Interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="origin-trial"
          content={process.env.NEXT_PUBLIC_SUMMARIZER_ORIGIN_TOKEN}
        />
        <meta
          httpEquiv="origin-trial"
          content={process.env.NEXT_PUBLIC_TRANSLATOR_ORIGIN_TOKEN}
        />
        <meta
          httpEquiv="origin-trial"
          content={process.env.NEXT_PUBLIC_LANGUAGE_DETECTOR_ORIGIN_TOKEN}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          {children}
          <Toaster position="top-center" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
