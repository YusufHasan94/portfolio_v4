import type { Metadata } from "next";
import "./globals.css";
import Header from "@/shared/Header/page";
import Footer from "@/shared/Footer/page";

export const metadata: Metadata = {
  title: "Yusuf Hasan | Software Engineer & Tech Enthusiast",
  description: "A dynamic portfolio showcasing my skills, projects, and passion for building innovative software solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
