import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Allure",
  description: "Allure - version iPhone luxe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${cormorant.variable} overflow-hidden`}>
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[#050505]" />
          <div className="absolute -left-24 top-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(201,174,114,0.18),transparent_62%)]" />
          <div className="absolute -right-28 bottom-10 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(201,174,114,0.14),transparent_60%)]" />
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(115deg,transparent_0%,transparent_44%,rgba(255,255,255,0.07)_45%,transparent_46%,transparent_100%),linear-gradient(65deg,transparent_0%,transparent_52%,rgba(201,174,114,0.16)_53%,transparent_54%,transparent_100%)]" />
        </div>

        <div className="relative mx-auto flex h-dvh w-full items-center justify-center overflow-hidden p-3">
          <div
            className="relative aspect-[440/956] overflow-hidden rounded-[42px] border-[6px] border-[#c9ae72] bg-[#f6f1e7] shadow-[0_25px_80px_rgba(0,0,0,0.55)]"
            style={{
              width:
                "min(392px, calc(100vw - 28px), calc((100dvh - 28px) * 440 / 956))",
            }}
          >
            <div className="absolute left-1/2 top-2 z-30 h-7 w-40 -translate-x-1/2 rounded-full bg-[#0b0b0b]" />
            <div className="absolute inset-x-0 top-0 z-20 h-16 bg-gradient-to-b from-[#f6f1e7] to-transparent" />
            <div className="relative h-full overflow-y-auto pt-2">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
