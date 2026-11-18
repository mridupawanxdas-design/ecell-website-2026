import { NextResponse } from "next/server";
import {
  generateCertificateEmailHtml,
  generateEncouragementEmailHtml,
} from "@/lib/mail-templates";

interface CertificatePayload {
  recipientEmail: string;
  recipientName?: string;
  eventName?: string;
  eventDate?: string;
  certificateType?: "Participation" | "Achievement";
  rankOrPosition?: string;
  certificateId?: string;
  isNonWinnerEncouragement?: boolean;
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as CertificatePayload;
    const {
      recipientEmail,
      recipientName,
      eventName,
      eventDate,
      certificateType,
      rankOrPosition,
      certificateId,
      isNonWinnerEncouragement,
    } = payload;

    let emailHtml: string;

    if (isNonWinnerEncouragement) {
      emailHtml = generateEncouragementEmailHtml({
        recipientName: recipientName ?? "Participant",
        eventName: eventName ?? "E-Cell Event",
        galleryUrl: "https://ecellnits.org/gallery",
        futureEventsUrl: "https://ecellnits.org/events",
      });
    } else {
      const resolvedCertId = certificateId ?? `CERT-${Date.now().toString(36).toUpperCase()}`;
      emailHtml = generateCertificateEmailHtml({
        recipientName: recipientName ?? "Participant",
        eventName: eventName ?? "E-Cell Event",
        eventDate: eventDate ?? "Recent Session",
        certificateType: certificateType ?? "Participation",
        rankOrPosition,
        certificateId: resolvedCertId,
        certificateUrl: `https://ecellnits.org/events?verify=${resolvedCertId}`,
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
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to process certificate email." },
      { status: 500 }
    );
  }
}
