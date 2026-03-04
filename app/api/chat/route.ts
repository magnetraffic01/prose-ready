import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL =
  process.env.N8N_CHAT_WEBHOOK_URL ||
  "https://n8n-n8n2.pholji.easypanel.host/webhook/prose-ready-chat";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("n8n error:", err);
      return NextResponse.json(
        { error: "n8n error", detail: err },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Chat proxy error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
