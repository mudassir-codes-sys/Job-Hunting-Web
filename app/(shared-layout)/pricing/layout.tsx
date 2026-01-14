import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import { Toaster } from "sonner";
import { GlobalContextProvider } from "../context/app-context";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "@/components/others/Header";
import ClientOnly from "@/components/others/ClientOnly";
import FetchUser from "@/components/others/fetchUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Subscription",
  description: "Subscribe a plan to become a paid/premium user",
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
        <GlobalContextProvider>
          <ClientOnly>
            <FetchUser />
            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
            >
              <Toaster richColors position="top-right" />
              <Header />

              {children}
            </GoogleOAuthProvider>
          </ClientOnly>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
