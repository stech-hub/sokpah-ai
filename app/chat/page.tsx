"use client";

import { useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([
    "Hello 👋 I am Sokpah AI. Ask me anything.",
  ]);

  function sendMessage() {
    if (!message) return;

    setMessages([...messages, "You: " + message]);
    setMessage("");
  }

  return (
    <section>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        🤖 Sokpah AI Chat
      </h1>

      <div style={styles.chatBox}>
        <div style={styles.log}>
          {messages.map((msg, i) => (
            <p key={i}>{msg}</p>
          ))}
        </div>

        <div style={styles.input}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </section>
  );
}

const styles = {
  chatBox: {
    maxWidth: "900px",
    margin: "auto",
    background: "#020617",
    padding: "20px",
    borderRadius: "20px",
  },
  log: {
    height: "280px",
    overflowY: "auto" as const,
    background: "#000",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "12px",
  },
  input: {
    display: "flex",
    gap: "10px",
  },
};
