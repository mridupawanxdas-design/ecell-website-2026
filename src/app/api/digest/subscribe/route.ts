import { NextResponse } from "next/server";

interface DigestSubscribePayload {
  name?: string;
  email: string;
  subscriberType?: string;
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as DigestSubscribePayload;

    if (!payload.email) {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Subscription successfully registered.",
      subscriber: {
        name: payload.name,
        email: payload.email,
        type: payload.subscriberType ?? "Current Student",
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to record subscription." },
      { status: 500 }
    );
  }
}
