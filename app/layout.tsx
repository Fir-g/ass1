import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/app/_components/navbar";
import SideNavbar from "@/app/_components/side-navbar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sauvant AI | Credit APP",
  description: "Sauvant AI | Credit APP, Loan management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="flex min-h-screen w-full flex-col">
          <Navbar />
          <div className="flex">
            <SideNavbar />
            <div className="ml-10 flex-1"> {children}</div>
          </div>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
