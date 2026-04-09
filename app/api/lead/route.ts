import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, whatsapp, challenge } = body;

    if (!fullName || !email || !whatsapp || !challenge) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    
    if (!scriptUrl) {
      console.warn("NEXT_PUBLIC_GOOGLE_SCRIPT_URL not configured. Logging lead to console.");
      console.log("Lead Data:", body);
      // For demo purposes or local development without secrets
      return NextResponse.json({ success: true, message: "Lead captured (Demo Mode)" });
    }

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Google Script responded with status: ${response.status}`);
    }

    const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (err) {
      console.error("Google Script did not return JSON. It returned HTML:", text.substring(0, 150) + "...");
      throw new Error("Invalid response from Google App Script. Ensure 'Who has access' is set to 'Anyone' (not 'Anyone with Google account').");
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { error: "Failed to process lead. Please try again later." },
      { status: 500 }
    );
  }
}
