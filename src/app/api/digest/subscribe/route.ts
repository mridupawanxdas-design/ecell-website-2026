import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, subscriberType } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }

    // Record subscription in database / mailing list provider
    return NextResponse.json({
      success: true,
      message: "Subscription successfully registered.",
      subscriber: {
        name,
        email,
        type: subscriberType || "Current Student",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to record subscription." },
      { status: 500 }
    );
  }
}
