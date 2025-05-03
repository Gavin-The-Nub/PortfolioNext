import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, message, name } = body;

    const html = `
      <div>
        <h2>New Message from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <br />
        <a href="mailto:${email}" style="padding: 10px 14px; background: #007bff; color: white; border-radius: 6px; text-decoration: none;">Reply</a>
      </div>
    `;

    const data = await resend.emails.send({
      from: "IanDev.xyz <contact@iandev.xyz>",
      to: ["lodorian18@gmail.com"], // change this to your destination email
      subject: `New message from ${name}`,
      html,
      reply_to: email,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
