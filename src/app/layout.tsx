import type { Metadata } from "next";
import Footer from "@/components/layout/Credit";
import Title from "@/components/layout/Title";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Real or Fake Game | Offline Party Game",
  description: "เล่นเกมปาร์ตี้ทายจริงหรือหลอกฟรี! ว่าใครเป็นสปาย!! เล่นกับเพื่อนในวง หรือครอบครัวได้ทุกที่ เหมาะสำหรับปาร์ตี้ออฟไลน์",
  icons:{
    icon:"/favicon.ico",
  },
  keywords: [
    "real or fake game",
    "เกมจริงหรือหลอก",
    "เกมปาร์ตี้",
    "เกมเล่นกับเพื่อน",
    "online party games",
    "เกมออนไลน์ฟรี",
    "offline party games",
    "free offline party games",
    "free real or fake game",
    "easy games to play with friends",
    "spy game"
  ],
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

