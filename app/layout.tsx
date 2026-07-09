import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Navigation Demo App",
  description: "A demo app showcasing different navigation patterns",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
