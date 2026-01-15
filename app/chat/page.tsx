"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; content: string }[]
  >([
    {
      role: "ai",
      content:
        "Hello 👋 I am Sokpah AI — an African-built intelligent assistant created by Akin S. Sokpah from Liberia 🇱🇷. How can I help you today?",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setLoading(true);

    // Add user message
    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error("API error");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            data.reply ||
            "Sorry, I couldn't generate a response at the moment.",
        },
      ]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "⚠️ Sokpah AI is temporarily unavailable. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>🤖 Sokpah AI Chat</h1>

      <div style={styles.chatContainer}>
        <div style={styles.messages}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.message,
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                background:
                  msg.role === "user"
                    ? "#00e6ff"
                    : "rgba(255,255,255,0.08)",
                color: msg.role === "user" ? "#000" : "#fff",
              }}
            >
              {msg.content}
            </div>
          ))}

          {loading && (
            <div style={{ ...styles.message, opacity: 0.7 }}>
              Sokpah AI is thinking...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div style={styles.inputArea}>
          <input
            type="text"
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            style={styles.input}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1,
            }}
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}

/* ===========================
   STYLES (INLINE FOR NOW)
   Can be moved to CSS later
   =========================== */

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  },

  title: {
    marginBottom: "25px",
    fontSize: "2.2rem",
  },

  chatContainer: {
    width: "100%",
    maxWidth: "900px",
    background: "#020617",
    borderRadius: "20px",
    padding: "20px",
    display: "flex",
    flexDirection: "column" as const,
  },

  messages: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
    background: "#000",
    padding: "15px",
    borderRadius: "12px",
    overflowY: "auto" as const,
    marginBottom: "15px",
  },

  message: {
    maxWidth: "75%",
    padding: "12px 16px",
    borderRadius: "14px",
    fontSize: "0.95rem",
    lineHeight: 1.5,
  },

  inputArea: {
    display: "flex",
    gap: "10px",
  },

  input: {
    flex: 1,
    padding: "12px 14px",
    borderRadius: "25px",
    border: "none",
    outline: "none",
    fontSize: "1rem",
  },

  button: {
    padding: "12px 22px",
    borderRadius: "25px",
    border: "none",
    background: "#00e6ff",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
