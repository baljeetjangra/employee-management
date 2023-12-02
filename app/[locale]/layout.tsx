import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { notFound } from "next/navigation";

// Can be imported from a shared config
const locales = ["en", "es"];
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Employee Management System",
  description: "",
};

export default function RootLayout({ children, params: { locale } }: any) {
  if (!locales.includes(locale as any)) notFound();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
