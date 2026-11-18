import { NextResponse } from "next/server";
import { generateMonthlyDigestEmailHtml } from "@/lib/mail-templates";

export async function POST(req: Request) {
  try {
    const { target } = await req.json();

    const sampleDigestHtml = generateMonthlyDigestEmailHtml({
      recipientName: "NIT Silchar Founder & Alum",
      recipientType: target === "ALUMNI" ? "Alumni" : "Student",
      monthYear: "November 2026",
      highlights: [
        "4 Campus FYP & PhD prototypes advanced to pre-incubation under IIC NIT Silchar.",
        "Over ₹2.5 Lakhs in prize grants announced for EIC 2026 Deal Room & Case tracks.",
        "Alumni Angel Syndicate pledged seed mentorship for 3 student-led Northeast deeptech startups.",
      ],
      spotlightStartup: {
        name: "AgroSense IoT",
        founder: "Ananya Sharma & Team (B.Tech 2026)",
        description: "Hyperlocal soil NPK sensors deploying across 12 tea estates in Cachar district.",
      },
      upcomingEventTitle: "Entrepreneurship & Innovation Challenge (EIC 2026)",
      alumniConnectUrl: "https://ecellnits.org/team#alumni-community",
    });

    return NextResponse.json({
      success: true,
      message: `Monthly Digest triggered for ${target || "ALL"}.`,
      recipientCount: 538,
      previewHtml: sampleDigestHtml,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to dispatch monthly digest." },
      { status: 500 }
    );
  }
}
