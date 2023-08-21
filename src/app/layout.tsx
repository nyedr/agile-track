import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toast";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
      <body className="flex justify-center min-h-screen overflow-x-hidden antialiased bg-secondary-background dark:bg-background">
        <Providers>
          {children}
          <Toaster position="bottom-left" />
        </Providers>
      </body>
    </html>
  );
}
