import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Geist } from "../public/fonts/fonts";

export const metadata: Metadata = {
  title: "Common Ground — Expense sharing",
  description: "A simple, friendly way to settle shared expenses.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${Geist.variable} h-full antialiased`}>
      <body className="min-h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
