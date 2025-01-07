import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

const interFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Management System",
  description: "Book Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={interFont.className}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
