import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ProSe Ready | Simulador de Entrevistas de Asilo con IA",
  description:
    "Practica tu entrevista de asilo como si fuera el día real con nuestra tecnología de IA. Simulaciones realistas, detección de contradicciones y feedback inmediato.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-display antialiased bg-background-light text-slate-900 transition-colors duration-300`}>
        {children}
      </body>
    </html>
  );
}
