import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.name || !data.formerRoleAtEcell || !data.currentCompany) {
      return NextResponse.json(
        { success: false, error: "Missing required alumni fields." },
        { status: 400 }
      );
    }

    // In production, save to MongoDB or database
    return NextResponse.json({
      success: true,
      message: "Alumni community registration received.",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to save alumni details." },
      { status: 500 }
    );
  }
}
