import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hello world example",
  description: "Created at Callchimp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-screen-lg border mx-auto">
          <Navigation />
          <div className="py-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
