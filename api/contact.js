import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Only POST allowed" });
    }

    const { name, email, message } = req.body;

    try {
        await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: "madalinealbright2@gmail.com", 
            subject: `New message from ${name}`,
            reply_to: email,
            html: `
                <h3>New Contact Form Message</h3>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Message:</b><br>${message}</p>
            `
        });

        return res.status(200).json({ success: true });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false });
    }
}