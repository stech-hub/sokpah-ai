export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>
        © 2026 <strong>Sokpah AI</strong> • Created by Akin S. Sokpah 🇱🇷
      </p>
      <p>Powered by OpenAI & Google Gemini • Deployed on Vercel</p>
    </footer>
  );
}

const styles = {
  footer: {
    padding: "30px",
    textAlign: "center" as const,
    background: "#000",
    opacity: 0.9,
    fontSize: "0.9rem",
  },
};
