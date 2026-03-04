"use client";
import { useState, useRef, useCallback } from "react";

export type MessageRole = "user" | "assistant" | "system";

export type ChatMessage = {
  id: string;
  role: MessageRole;
  content: string;
  audioUrl?: string;
  isLoading?: boolean;
  timestamp: Date;
};

const SYSTEM_PROMPT = `Eres un oficial de asilo de USCIS (Servicio de Ciudadanía e Inmigración de Estados Unidos) que realiza entrevistas de asilo. Tu rol es:

1. Realizar preguntas reales de entrevistas de asilo de forma profesional pero empática
2. Detectar inconsistencias en las respuestas del solicitante
3. Al final de la sesión, dar un resumen evaluativo con puntos fuertes y débiles
4. Adaptar tu lenguaje al idioma del usuario (español, inglés o portugués)

Empieza presentándote brevemente y haciendo la primera pregunta estándar de asilo.
Mantén un tono profesional pero humano. No uses markdown en tus respuestas, habla de forma natural.
Cada respuesta debe ser concisa (máximo 3-4 oraciones).`;

export function useSimulation() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const sessionIdRef = useRef<string>(
    Math.random().toString(36).substring(2, 10)
  );

  const addMessage = (msg: Omit<ChatMessage, "id" | "timestamp">) => {
    const full: ChatMessage = {
      ...msg,
      id: Math.random().toString(36).substring(2, 10),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, full]);
    return full;
  };

  const sendToN8n = useCallback(
    async (userMessage: string, history: ChatMessage[]) => {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          sessionId: sessionIdRef.current,
          locale:
            typeof navigator !== "undefined"
              ? navigator.language.split("-")[0]
              : "es",
          history: history.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          systemPrompt: SYSTEM_PROMPT,
        }),
      });
      if (!res.ok) throw new Error("Error de red");
      const data = await res.json();
      return data.reply as string;
    },
    []
  );

  const startSession = useCallback(async () => {
    setIsStarted(true);
    setIsLoading(true);
    const loadingMsg = addMessage({
      role: "assistant",
      content: "",
      isLoading: true,
    });
    try {
      const reply = await sendToN8n("INICIO_SESION", []);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingMsg.id
            ? { ...m, content: reply, isLoading: false }
            : m
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingMsg.id
            ? {
                ...m,
                content: "Error al conectar con el servidor. Intenta de nuevo.",
                isLoading: false,
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [sendToN8n]);

  const sendText = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;
      const userMsg = addMessage({ role: "user", content: text });
      setIsLoading(true);
      const loadingMsg = addMessage({
        role: "assistant",
        content: "",
        isLoading: true,
      });
      try {
        const currentHistory = [...messages, userMsg];
        const reply = await sendToN8n(text, currentHistory);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === loadingMsg.id
              ? { ...m, content: reply, isLoading: false }
              : m
          )
        );
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === loadingMsg.id
              ? {
                  ...m,
                  content: "Error al procesar tu mensaje. Intenta de nuevo.",
                  isLoading: false,
                }
              : m
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, sendToN8n]
  );

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/mp4";
      const recorder = new MediaRecorder(stream, { mimeType });
      audioChunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      recorder.start(100);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch {
      alert("No se pudo acceder al micrófono. Verifica los permisos.");
    }
  }, []);

  const stopRecording = useCallback(async () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder) return;

    return new Promise<void>((resolve) => {
      recorder.onstop = async () => {
        setIsRecording(false);
        const audioBlob = new Blob(audioChunksRef.current, {
          type: recorder.mimeType,
        });
        recorder.stream.getTracks().forEach((t) => t.stop());

        // Transcribe via API
        setIsLoading(true);
        const loadingTranscribeId = Math.random().toString(36).substring(2);
        setMessages((prev) => [
          ...prev,
          {
            id: loadingTranscribeId,
            role: "user",
            content: "🎤 Transcribiendo audio...",
            isLoading: true,
            timestamp: new Date(),
          },
        ]);

        try {
          const formData = new FormData();
          formData.append("audio", audioBlob, "recording.webm");
          formData.append(
            "locale",
            navigator.language.split("-")[0] || "es"
          );

          const transcribeRes = await fetch("/api/transcribe", {
            method: "POST",
            body: formData,
          });
          const { text } = await transcribeRes.json();

          // Replace loading transcription with actual text
          setMessages((prev) =>
            prev.map((m) =>
              m.id === loadingTranscribeId
                ? { ...m, content: text, isLoading: false }
                : m
            )
          );

          // Send transcribed text to n8n
          const lMsg = addMessage({
            role: "assistant",
            content: "",
            isLoading: true,
          });
          const currentHistory = messages.filter(
            (m) => m.id !== loadingTranscribeId
          );
          const reply = await sendToN8n(text, [
            ...currentHistory,
            {
              id: loadingTranscribeId,
              role: "user",
              content: text,
              timestamp: new Date(),
            },
          ]);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === lMsg.id
                ? { ...m, content: reply, isLoading: false }
                : m
            )
          );
        } catch {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === loadingTranscribeId
                ? {
                    ...m,
                    content: "Error al transcribir. Intenta de nuevo.",
                    isLoading: false,
                  }
                : m
            )
          );
        } finally {
          setIsLoading(false);
          resolve();
        }
      };
      recorder.stop();
    });
  }, [messages, sendToN8n]);

  const reset = useCallback(() => {
    setMessages([]);
    setIsStarted(false);
    setIsLoading(false);
    sessionIdRef.current = Math.random().toString(36).substring(2, 10);
  }, []);

  return {
    messages,
    isRecording,
    isLoading,
    isStarted,
    startSession,
    sendText,
    startRecording,
    stopRecording,
    reset,
  };
}
