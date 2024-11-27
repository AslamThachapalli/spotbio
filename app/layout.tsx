import type { Metadata } from "next";
import { Mulish, Bokor } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Providers from "./providers";

const mulish = Mulish({
  subsets: ['latin'],
  variable: '--font-mulish',
})

const bokor = Bokor({
  subsets: ['khmer'],
  weight: ['400'],
  variable: '--font-bokor',
})

export const metadata: Metadata = {
  title: "Spotbio",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${mulish.variable} ${bokor.variable} font-mulish antialiased`}
        suppressHydrationWarning={true}
      >
        <Providers>
          {children}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
