import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/icon.png";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Page Transitions",
  description:
    "Working example of using custom page transitions when navigating in a NextJs 14 (App Router) web app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="overflow-x-hidden h-full"
      style={{ fontSize: 18 }}
    >
      <body className={`${font.className} h-full flex flex-col`}>
        <nav className="mb-8">
          <div className="px-8 py-4 shadow-sm flex items-center z-50 relative bg-white gap-8">
            <Link href="/" className="flex items-center gap-4">
              <Image src={logo} alt="Home" width={40} height={40} />
              <span className="text-xl">LillieBook</span>
            </Link>
            <Link href="/page">Browse</Link>
            <Link href="/page">My Projects</Link>
          </div>
        </nav>
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
