import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "sonner";
import { GlobalContextProvider } from "./context/app-context";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "@/components/others/Header";
import ClientOnly from "@/components/others/ClientOnly";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page of the web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalContextProvider>
      <ClientOnly>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <Toaster richColors position="top-right" />
          <Header />

          {children}
        </GoogleOAuthProvider>
      </ClientOnly>
    </GlobalContextProvider>
  );
}
