import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audio = formData.get("audio") as File;
    const locale = (formData.get("locale") as string) || "es";

    if (!audio) {
      return NextResponse.json({ error: "No audio provided" }, { status: 400 });
    }

    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    // Map locale to full language name for Whisper prompt
    const langMap: Record<string, string> = {
      es: "Spanish",
      en: "English",
      pt: "Portuguese",
    };
    const language = langMap[locale] || "Spanish";

    const whisperForm = new FormData();
    whisperForm.append("file", audio, "recording.webm");
    whisperForm.append("model", "whisper-1");
    whisperForm.append("language", locale);
    whisperForm.append(
      "prompt",
      `Asylum interview simulation in ${language}. Legal and immigration terminology.`
    );

    const whisperRes = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${OPENAI_API_KEY}` },
        body: whisperForm,
      }
    );

    if (!whisperRes.ok) {
      const err = await whisperRes.text();
      console.error("Whisper error:", err);
      return NextResponse.json(
        { error: "Transcription failed", detail: err },
        { status: 502 }
      );
    }

    const { text } = await whisperRes.json();
    return NextResponse.json({ text });
  } catch (err) {
    console.error("Transcribe error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
