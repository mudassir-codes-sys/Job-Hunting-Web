import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { GlobalContextProvider } from "./(shared-layout)/context/app-context";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ClientOnly from "@/components/others/ClientOnly";
import FetchUser from "@/components/others/fetchUser";


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
    <html lang="en">
      <body>
        <GlobalContextProvider>
          <ClientOnly>
            <FetchUser />
            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
            >
              <Toaster richColors position="top-right" />

              {children}
            </GoogleOAuthProvider>
          </ClientOnly>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
