import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export class NotificationProvider {
    static async sendEmail(to: string, subject: string, html: string) {
        try {
            await resend.emails.send({
                from: "Clinic <noreply@yourdomain.com>",
                to,
                subject,
                html,
            });
            return { success: true };
        } catch (error) {
            console.error("Email Error:", error);
            return { success: false, error };
        }
    }

    static async sendSMS(to: string, message: string) {
        // Abstraction for BD SMS Gateway (e.g., SSLWireless, Itelbd, or Twilio)
        // For now, we log to console.
        console.log(`[SMS to ${to}]: ${message}`);
        // implementation for local gateway would go here
        return { success: true };
    }
}
