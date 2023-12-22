import type { Metadata } from "next";
import { Lora, Fira_Code } from "next/font/google";
import "./globals.css";

const victorMono = Fira_Code({ subsets: ["latin"], variable: "--font-mono" });
const lora = Lora({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Weeks of Your Life",
  description:
    "See your life in weeks. Inspired by Tim Urban's Your Life in Weeks (Wait But Why) and Buster Benson's Life in Weeks.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${victorMono.variable} ${lora.variable}`}>
        {children}
      </body>
    </html>
  );
}
