import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/bar/nav";
import BottomBar from "@/components/bar/bottom"
import { contactInfo, links, support } from '@/lib/BottomBarInfo'
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
import { ThemeProvider } from "@/components/theme-provider"
export const metadata: Metadata = {
  title: "AliendoServer",
  description: "R冷還沒想好要放什麼介紹ewe",
  icons: 'static/aliendo_icon.png'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <BottomBar
            contactInfo={contactInfo}
            links={links}
            support={support}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
