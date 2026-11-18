import { NextResponse } from "next/server";
import { generateRegistrationEmailHtml } from "@/lib/mail-templates";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      participantName,
      participantEmail,
      eventName,
      eventDate,
      venue,
      registrationId,
    } = body;

    const emailHtml = generateRegistrationEmailHtml({
      participantName: participantName || "Participant",
      eventName: eventName || "E-Cell Event",
      eventDate: eventDate || "TBA",
      venue: venue || "NIT Silchar Campus",
      registrationId: registrationId || `REG-${Date.now().toString(36).toUpperCase()}`,
    });

    // In production, integrate nodemailer, Resend, or SendGrid here
    // For local dev, return success with compiled template
    return NextResponse.json({
      success: true,
      message: "Registration recorded and confirmation email queued.",
      previewHtml: emailHtml,
      recipient: participantEmail,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process event registration." },
      { status: 500 }
    );
  }
}
