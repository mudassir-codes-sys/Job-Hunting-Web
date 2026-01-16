import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "sonner";
import { GlobalContextProvider } from "../(shared-layout)/context/app-context";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata: Metadata = {
  title: "Verify your email",
  description: "Verify your email to continue",
};

export default function VerifyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalContextProvider>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <Toaster richColors position="top-right" />
        {children}
      </GoogleOAuthProvider>
    </GlobalContextProvider>
  );
}
