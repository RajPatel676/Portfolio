import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Using Outfit as modern sans-serif
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";
import { Header } from "@/components/layout/Header";
import { DynamicTitle } from "@/components/ui/DynamicTitle";
import { cn } from "@/lib/utils";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Raj Patel | Full-Stack Developer",
  description: "Full-Stack Developer focused on Web, AI, and Web3.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased bg-background text-foreground",
          outfit.variable
        )}
      >
        <SmoothScroll>
          <DynamicTitle />
          <Cursor />
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
