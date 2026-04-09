import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import AppFooter from "@/components/layout/AppFooter";

export const metadata: Metadata = {
  title: "Atrox Tax Calendar 2026",
  description: "Професионален данъчен календар за счетоводители",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body className="antialiased">
        <div className="min-h-screen flex flex-col" style={{ background: "#F7F5F2" }}>
          <MobileNav />
          <Sidebar />
          <main className="lg:ml-64 flex-1 pt-14 lg:pt-0 flex flex-col min-h-screen">
            <div className="flex-1 p-6 lg:p-8">
              {children}
            </div>
            <AppFooter />
          </main>
        </div>
      </body>
    </html>
  );
}
