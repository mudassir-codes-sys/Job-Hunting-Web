import type { Metadata } from "next";
import "../../globals.css";
import { Toaster } from "sonner";
import { GlobalContextProvider } from "../context/app-context";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "@/components/others/Header";

export const metadata: Metadata = {
  title: "Post Job",
  description: "Post job to hire employees",
};

export default function PostJobLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <GlobalContextProvider>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
          >
            <Toaster richColors position="top-right" />
            <Header />

            {children}
          </GoogleOAuthProvider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
