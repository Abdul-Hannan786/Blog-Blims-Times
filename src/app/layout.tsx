import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "@/Context/AuthContext";
import Navbar from "@/Components/Navbar";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Blog Blims Times",
  description: "Blogging App where user can see blogs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <AuthContextProvider>
        <html lang="en" data-theme="black, cmyk">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            data-theme="mytheme cmyk"
          >
            <Navbar />
            {children}
            <ToastContainer autoClose={2000} />
          </body>
        </html>
      </AuthContextProvider>
  );
}
