export default function AppFooter({ text = "© 2025 Recipe Lab" }) {
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
      {text}
    </footer>
  );
}
//“fixed” thật sự ở đáy