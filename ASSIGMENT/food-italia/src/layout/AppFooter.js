export default function AppFooter({ text = "© 2025 Recipe Lab", github = "https://github.com/your-username" }) {
  return (
    <footer
      className="text-center small text-white"
      style={{
        position: "fixed",
        left: 0, right: 0, bottom: 0,
        background: "#dc3545",
        padding: "12px 0",
      }}
    >
      {text} ·{" "}
      <a href={github} target="_blank" rel="noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>
        My GitHub
      </a>
    </footer>
  );
}
