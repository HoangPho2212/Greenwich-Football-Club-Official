import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GreFC - Football Club",
  description: "Official Website for GreFC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <nav className="bg-blue-900 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">GreFC</h1>
              <div className="space-x-4">
                <a href="/" className="hover:text-blue-300">Home</a>
                <a href="/players" className="hover:text-blue-300">Players</a>
                <a href="/club" className="hover:text-blue-300">Club</a>
                <a href="/admin" className="hover:text-blue-300">Admin</a>
              </div>
            </div>
          </nav>
          <main className="container mx-auto p-4 min-h-screen">
            {children}
          </main>
          <footer className="bg-gray-800 text-white text-center p-4">
            <p>&copy; {new Date().getFullYear()} GreFC. All rights reserved.</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
