import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { MessageCircle } from "lucide-react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartlyTap - World's No1 NFC Digital Business Card",
  description: "Grow your business with smart NFC cards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        
        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/919662643079" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-accent text-white rounded-full shadow-[0_8px_20px_rgba(0,183,181,0.3)] hover:scale-110 hover:shadow-[0_12px_25px_rgba(0,183,181,0.4)] transition-all duration-300"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
      </body>
    </html>
  );
}
