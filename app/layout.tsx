import type { Metadata } from "next";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Quiz App",
  description: "Aplikasi kuis seru-seruan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-blue-950">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
