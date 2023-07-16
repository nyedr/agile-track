import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toast";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agile Track | Issue Tracking Software",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 dark:bg-slate-900 antialiased min-h-screen">
        <Providers>
          {children}
          <Toaster position="bottom-left" />
        </Providers>
      </body>
    </html>
  );
}
