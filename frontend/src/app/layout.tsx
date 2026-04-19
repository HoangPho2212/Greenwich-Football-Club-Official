import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GreFC - Football Club",
  description: "Official Website for GreFC",
};

import { Facebook, Instagram, Mail, MapPin, Phone, Github } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <nav className="bg-blue-900 text-white p-4 shadow-xl sticky top-0 z-50 backdrop-blur-md bg-blue-900/90">
            <div className="container mx-auto flex justify-between items-center">
              <a href="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-white rounded-full overflow-hidden shadow-lg group-hover:scale-110 transition-transform flex items-center justify-center">
                  <img src="/uploads/img/AVATA-GreFC.png" alt="GreFC Logo" className="w-full h-full object-contain scale-110" />
                </div>
                <h1 className="text-xl font-black uppercase tracking-tighter">Greenwich <span className="text-blue-400">FC</span></h1>
              </a>
              <div className="hidden md:flex items-center space-x-8 font-bold text-xs uppercase tracking-[0.2em]">
                <a href="/" className="hover:text-blue-300 transition-colors">Home</a>
                <a href="/players" className="hover:text-blue-300 transition-colors">Squad</a>
                <a href="/club" className="hover:text-blue-300 transition-colors">About Club</a>
              </div>
            </div>
          </nav>

          <main className="container mx-auto min-h-screen">
            {children}
          </main>

          <footer className="bg-blue-950 text-white pt-20 pb-10 border-t border-white/5">
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-4 gap-12 mb-16">
                {/* Column 1: Club Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full overflow-hidden shadow-xl flex items-center justify-center">
                      <img src="/uploads/img/AVATA-GreFC.png" alt="GreFC" className="w-full h-full object-contain scale-110" />
                    </div>
                    <span className="text-xl font-black uppercase tracking-tighter">Gre <span className="text-blue-400">FC</span></span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium">
                    The official football club of the University of Greenwich. Built on passion, excellence, and a strong student community since 2018.
                  </p>
                    <div className="flex gap-4">
                      <a href="https://www.facebook.com/Grefc?locale=vi_VN" className="w-10 h-10 bg-white/5 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all border border-white/10 shadow-lg">
                        <Facebook size={18} />
                      </a>
                    <a href="mailto:grefc.dn@gmail.com" className="w-10 h-10 bg-white/5 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all border border-white/10 shadow-lg">
                      <Mail size={18} />
                    </a>
                  </div>
                </div>

                {/* Column 2: Navigation */}
                <div className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-blue-400">Quick Navigation</h3>
                  <ul className="space-y-4 text-sm font-bold text-gray-400 uppercase tracking-tighter">
                    <li><a href="/" className="hover:text-white transition-colors flex items-center gap-2">Home Page</a></li>
                    <li><a href="/players" className="hover:text-white transition-colors flex items-center gap-2">Squad & Staff</a></li>
                    <li><a href="/club" className="hover:text-white transition-colors flex items-center gap-2">Club History</a></li>
                  </ul>
                </div>

                {/* Column 3: Contact */}
                <div className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-blue-400">Headquarters</h3>
                  <ul className="space-y-4 text-sm font-medium text-gray-400">
                    <li className="flex gap-3">
                      <MapPin size={18} className="text-blue-500 shrink-0" />
                      <span>658 Ng. Quyền, An Hải Bắc, Sơn Trà, Đà Nẵng</span>
                    </li>
                    <li className="flex gap-3">
                      <Mail size={18} className="text-blue-500 shrink-0" />
                      <span>grefc.dn@gmail.com</span>
                    </li>
                    <li className="flex gap-3 text-white italic font-black">
                      <span className="px-2 py-1 bg-blue-600 rounded text-[10px] uppercase">Training</span>
                      <span>Thu 7:30 PM - 8:30 PM</span>
                    </li>
                  </ul>
                </div>

                {/* Column 4: Newsletter/Motto */}
                <div className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-blue-400">Club Motto</h3>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10 shadow-inner italic text-gray-300 text-sm leading-relaxed">
                    "United by Passion, Driven by Excellence. We don't just play the game, we represent the Spirit of Greenwich."
                  </div>
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-gray-500 text-xs font-black uppercase tracking-widest">
                  &copy; {new Date().getFullYear()} Greenwich Football Club. All Rights Reserved.
                </p>
                <div className="flex items-center gap-2 text-gray-500 text-xs font-black uppercase tracking-widest">
                  <span>Developed by</span>
                  <a href="https://github.com/HoangPho2212" className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full hover:text-white hover:bg-blue-600 transition-all">
                    <Github size={12} /> Hoang Pho
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}

