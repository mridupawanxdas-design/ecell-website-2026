import { NextResponse } from "next/server";
import { generateRegistrationEmailHtml } from "@/lib/mail-templates";

interface RegisterPayload {
  participantName?: string;
  participantEmail: string;
  eventName?: string;
  eventDate?: string;
  venue?: string;
  registrationId?: string;
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as RegisterPayload;
    const {
      participantName,
      participantEmail,
      eventName,
      eventDate,
      venue,
      registrationId,
    } = payload;

    const emailHtml = generateRegistrationEmailHtml({
      participantName: participantName ?? "Participant",
      eventName: eventName ?? "E-Cell Event",
      eventDate: eventDate ?? "TBA",
      venue: venue ?? "NIT Silchar Campus",
      registrationId: registrationId ?? `REG-${Date.now().toString(36).toUpperCase()}`,
    });

    return NextResponse.json({
      success: true,
      message: "Registration recorded and confirmation email queued.",
      previewHtml: emailHtml,
      recipient: participantEmail,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to process event registration." },
      { status: 500 }
    );
  }
}
