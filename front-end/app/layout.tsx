import "@/app/globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EventSphere - Discover Amazing Events",
  description: "Find and book tickets for the best events in your area.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SiteHeader />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
