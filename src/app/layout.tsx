import type { Metadata } from "next";
import Footer from "@/components/layout/Credit";
import Title from "@/components/layout/Title";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Real or Fake Game",
  description: "Create offline party game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="vsc-initialized">
        <div className="flex flex-col min-h-screen overflow-hidden">
          <Toaster position="top-center" richColors />
          <Title />
          <main className="flex-grow overflow-auto">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

