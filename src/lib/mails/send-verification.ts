import nodemailer from "nodemailer";
import { getHTML } from "./verification-email";

export async function sendVerificationEmail({
  to,
  username,
  verifyUrl,
}: {
  to: string;
  username: string;
  verifyUrl: string;
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true for 465, false for others like 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const html = await getHTML(username, verifyUrl);
    const subject = `Wace Email Verification - ${Date.now()}`; // unique subject

    const info = await transporter.sendMail({
      from: '"Wace Team" <no-reply@wace.pro>',
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.messageId);

    return {
      success: true,
      error:null,
    };
  } catch (error: any) {
    console.error("❌ Error sending verification email:", error.message);

    return {
      success: false,
      error: error.message || "Unexpected error while sending verification email",
    };
  }
}
