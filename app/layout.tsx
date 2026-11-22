import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AuthGate from "@/components/layouts/AuthGate";
import Header from "@/components/layouts/Header/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LOA SCHEDULE",
  description: "LostArk Schedule - 로아 스케쥴",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("theme")==="dark")document.documentElement.classList.add("dark");if(!localStorage.getItem("access_token")&&location.pathname!=="/login")location.replace("/login")}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col pt-[76px]">
        <AuthGate>
          <Header />
          {children}
        </AuthGate>
      </body>
    </html>
  );
}
