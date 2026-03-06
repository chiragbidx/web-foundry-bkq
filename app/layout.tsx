import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ErrorReporter from "../components/ErrorReporter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Componeasy — UI Component Generator",
  description: "Describe your UI in text, instantly generate React and HTML code. Componeasy helps developers ship production-ready components faster.",
  metadataBase: new URL("https://componeasy.com"),
  openGraph: {
    title: "Componeasy — UI Component Generator",
    description: "Generate working React and HTML code from just a description. The fastest way to create UI components.",
    url: "https://componeasy.com",
    siteName: "Componeasy",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorReporter />
        {children}
      </body>
    </html>
  );
}