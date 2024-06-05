import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'reactflow/dist/style.css';
import { Header } from "@/components/layout/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flow LLM",
  description: "Bringing new options to the dialogue with LLMs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="h-[calc(100vh-40px)]">
          {children}
        </div>
      </body>
    </html>
  );
}
