import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PII Firewall Edge - Enterprise PII Detection | Zero AI, Zero Logs",
  description: "Detect and redact 152 PII types in 5ms. No AI models, no data retention. Protect customer data before sending to LLMs. GDPR and CCPA compliant. Starting at $9/month.",
  keywords: "PII detection, data privacy, GDPR compliance, ChatGPT privacy, LLM security, redaction API, personal data protection",
  authors: [{ name: "PII Firewall Edge" }],
  openGraph: {
    title: "PII Firewall Edge - Enterprise PII Detection",
    description: "Detect and redact 152 PII types in 5ms. Zero AI. Zero Logs.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PII Firewall Edge - Enterprise PII Detection",
    description: "Detect and redact 152 PII types in 5ms. Zero AI. Zero Logs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
