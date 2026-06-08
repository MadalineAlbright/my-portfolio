import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Only POST allowed" });
    }

    const body = typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body;

    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const result = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "madalinealbright2@gmail.com",
      subject: `New message from ${name}`,
      reply_to: email,
      html: `
        <h2>[Portfolio Website] New Inquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br>${message}</p>
      `
    });

    return res.status(200).json({ success: true, result });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}