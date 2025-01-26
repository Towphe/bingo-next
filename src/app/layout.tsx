import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BinGO", // change name later on
  description: "Easy offline bingo made possible online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
