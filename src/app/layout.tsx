import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toast";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agile Track | Issue Tracking Software",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className} lang="en">
      <body className="bg-slate-50 dark:bg-slate-900 antialiased min-h-screen flex items-center justify-center">
        <Providers>
          {children}
          <Toaster position="bottom-left" />
          <Header />
        </Providers>
      </body>
    </html>
  );
}
