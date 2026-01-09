import React from "react";
import EmailTemplate, { emailProps } from "../components/others/emailTemplate";
import { Resend } from "resend";

interface props extends emailProps {
  email: string;
}
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ name, email, code }: props): Promise<void> {
  try {
    const { data, error } = await resend.emails.send({
      from: "Levels <onboarding@resend.dev>",
      to: "levelscure@gmail.com",
      subject: "Email Verification code",
      react: React.createElement(EmailTemplate, { name, code }),
    });

    if (error) {
      console.log("Email error", error.message);
    } else {
      console.log("Email send");
    }
  } catch (error) {
    console.log((error as Error).message);
  }
}
