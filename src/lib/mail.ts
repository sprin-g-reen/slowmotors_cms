import { Resend } from "resend";
import { ReactElement } from "react";

// Initialize Resend with API key if present, otherwise it will fail gracefully or we handle it
const resend = new Resend(process.env.RESEND_API_KEY || "re_123");

interface SendEmailPayload {
  to: string;
  subject: string;
  react: React.ReactElement | React.ReactNode;
}

export async function sendTransactionalEmail({ to, subject, react }: SendEmailPayload) {
  // In development, log to console to save quota/avoid errors without real API key
  if (process.env.NODE_ENV !== "production") {
    console.log("---------------------------------------------------");
    console.log(`[Dev Mode] Sending Email:`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log("---------------------------------------------------");
    return { success: true, id: "dev-mock-id" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Slow Motors <onboarding@resend.dev>", // Update this with verified domain in prod
      to,
      subject,
      react,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    console.error("Email Sending Failed:", error);
    return { success: false, error };
  }
}
