import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recipia Chef - Tu sous-chef digital con IA",
  description:
    "Descubre, crea y comparte recetas con asistencia de IA y control por voz. Tu compañero culinario inteligente.",
  keywords: ["recetas", "cocina", "IA", "chef", "gastronomía"],
  authors: [{ name: "Recipia Team" }],
  openGraph: {
    title: "Recipia Chef",
    description: "Tu sous-chef digital con IA y control por voz",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-center" expand={true} richColors />
      </body>
    </html>
  );
}
