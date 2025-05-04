import type { Metadata } from "next";
import Footer from "@/components/layout/Credit";
import Title from '@/components/layout/Title'
import "./globals.css";

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
        <Footer />
      </body>
    </html>
  );
}
