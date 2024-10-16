import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Providers from "./providers";

const mulish = Mulish({
  subsets: ['latin'],
  variable: '--font-mulish',
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
        className={`${mulish.variable} font-mulish antialiased`}
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
