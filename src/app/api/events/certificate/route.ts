import { NextResponse } from "next/server";
import {
  generateCertificateEmailHtml,
  generateEncouragementEmailHtml,
} from "@/lib/mail-templates";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      recipientEmail,
      recipientName,
      eventName,
      eventDate,
      certificateType,
      rankOrPosition,
      certificateId,
      isNonWinnerEncouragement,
    } = body;

    let emailHtml: string;

    if (isNonWinnerEncouragement) {
      emailHtml = generateEncouragementEmailHtml({
        recipientName: recipientName || "Participant",
        eventName: eventName || "E-Cell Event",
        galleryUrl: "https://ecellnits.org/gallery",
        futureEventsUrl: "https://ecellnits.org/events",
      });
    } else {
      emailHtml = generateCertificateEmailHtml({
        recipientName: recipientName || "Participant",
        eventName: eventName || "E-Cell Event",
        eventDate: eventDate || "Recent Session",
        certificateType: certificateType || "Participation",
        rankOrPosition,
        certificateId: certificateId || `CERT-${Date.now().toString(36).toUpperCase()}`,
        certificateUrl: `https://ecellnits.org/events?verify=${certificateId}`,
        galleryUrl: "https://ecellnits.org/gallery",
        futureEventsUrl: "https://ecellnits.org/events",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Certificate email queued successfully.",
      recipient: recipientEmail,
      previewHtml: emailHtml,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process certificate email." },
      { status: 500 }
    );
  }
}
