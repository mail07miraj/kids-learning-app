import { Routes, Route, useNavigate } from "react-router-dom";
import EnglishKeyboard from "./pages/EnglishKeyboard";
import BanglaSwaroborno from "./pages/BanglaSwaroborno";
import BanglaByanjan from "./pages/BanglaByanjan";
import BanglaNumbers from "./pages/BanglaNumbers";
import BanglaRhymes from "./pages/BanglaRhymes";
function Home() {
  const navigate = useNavigate();

  const Section = ({ title, children }) => (
    <div style={{ marginTop: "50px" }}>
      <h2 style={{ marginBottom: "20px", fontSize: "28px" }}>
        {title}
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px"
        }}
      >
        {children}
      </div>
    </div>
  );

  const Card = ({ text, onClick }) => (
    <div
      onClick={onClick}
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "20px",
        textAlign: "center",
        cursor: onClick ? "pointer" : "default",
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        transition: "0.2s"
      }}
      onMouseEnter={e =>
        (e.currentTarget.style.transform = "translateY(-5px)")
      }
      onMouseLeave={e =>
        (e.currentTarget.style.transform = "none")
      }
    >
      {text}
    </div>
  );

  return (
    <div
      style={{
        fontFamily: "Comic Sans MS",
        background: "linear-gradient(135deg,#fef9c3,#bfdbfe)",
        minHeight: "100vh",
        padding: "30px"
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "50px", color: "#ec4899" }}>
        🎉 Kids Learning App 🎉
      </h1>

      <Section title="📚 Language Learning">
        <Card
          text="🔤 ABC"
          onClick={() => navigate("/english-keyboard")}
        />
        <Card text="🔤 স্বরবর্ণ" onClick={() => navigate("/bangla-swaroborno")} />
        <Card text="🔡 ব্যঞ্জনবর্ণ" onClick={() => navigate("/bangla-byanjan")}/>
        <Card text="🔢 বাংলা সংখ্যা" onClick={() => navigate("/bangla-numbers")} />
        <Card text="🕌 আরবি বর্ণমালা" />
      </Section>

      <Section title="🎵 Rhymes & Recitation">
        <Card text="📖 বাংলা ছড়া" onClick={() => navigate("/bangla-rhymes")} />
        <Card text="🎶 English Rhymes" />
        <Card text="🎼 গজল" />
      </Section>

      <Section title="☪️ Islamic Learning">
        <Card text="📜 সূরা" />
        <Card text="🕋 কালেমা" />
        <Card text="🤲 দোয়া" />
      </Section>

      <Section title="🌍 General Knowledge">
        <Card text="🥦 Vegetables, Fruits & Flowers" />
        <Card text="🐯 Animals, Birds & Vehicles" />
        <Card text="🧍 Human Body" />
      </Section>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/english-keyboard" element={<EnglishKeyboard />} />
      <Route path="/bangla-swaroborno" element={<BanglaSwaroborno />} />
      <Route path="/bangla-byanjan" element={<BanglaByanjan />} />
      <Route path="/bangla-numbers" element={<BanglaNumbers />} />
      <Route path="/bangla-rhymes" element={<BanglaRhymes />} />
    </Routes>
  );
}