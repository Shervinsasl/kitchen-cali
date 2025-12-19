import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kitchen Cali | Location Picker",
  description: "Choose your California city to find nearby caterers."
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-linen text-deep-green antialiased">{children}</body>
    </html>
  );
}

