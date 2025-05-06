import type { Metadata } from "next";
import Footer from "@/components/layout/Credit";
import Title from '@/components/layout/Title'
import "./globals.css";
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: "Real of Fake Game",
  description: "crete game offline game of party",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="vsc-initialized">
        <Title />
        <div className="min-h-screen overflow-hidden">{children}</div>
        <Toaster position="top-center" richColors />
        <Footer />
      </body>
    </html>
  );
}
