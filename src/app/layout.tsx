import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import AppNavbar from "@/components/AppNavBar";
import { ToastContainer } from "react-toastify";
import { toastConfig } from "@/utils/toastConfig";
import AuthWrapper from "@/components/AuthWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Flow",
  description: "A task management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <AuthWrapper>
            <div className="flex flex-col min-h-screen h-full">
              <AppNavbar />
              {children}
            </div>
          </AuthWrapper>
          <ToastContainer {...toastConfig} />
        </Providers>
      </body>
    </html>
  );
}
