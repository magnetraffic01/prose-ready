import { NextRequest, NextResponse } from "next/server";

const N8N_CALL_WEBHOOK =
  process.env.N8N_CALL_WEBHOOK_URL ||
  "https://n8n-n8n2.pholji.easypanel.host/webhook/prose-ready-call";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch(N8N_CALL_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Call proxy error:", err);
    return NextResponse.json({ success: false, error: "Error al iniciar la llamada" }, { status: 500 });
  }
}
