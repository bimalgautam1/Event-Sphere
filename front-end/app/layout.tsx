import "@/app/globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { Inter } from "next/font/google";
import type React from "react";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EventSphere - Discover Amazing Events",
  description: "Find and book tickets for the best events in your area.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} wrapper`}>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
