"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Sokpah AI</h2>

      <div style={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/chat">AI Chat</Link>
        <Link href="/liberia">Liberia Hub</Link>
        <Link href="/auth">Login</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 25px",
    background: "rgba(0,0,0,0.7)",
    position: "sticky" as const,
    top: 0,
    zIndex: 999,
  },
  logo: {
    margin: 0,
    letterSpacing: "1px",
  },
  links: {
    display: "flex",
    gap: "18px",
    fontSize: "0.95rem",
  },
};
