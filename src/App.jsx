import { Routes, Route, useNavigate } from "react-router-dom";

import EnglishAlphabet from "./pages/EnglishAlphabet";
import BanglaSwaroborno from "./pages/BanglaSwaroborno";
import BanglaByanjan from "./pages/BanglaByanjan";
import BanglaNumbers from "./pages/BanglaNumbers";
import BanglaRhymes from "./pages/BanglaRhymes";
import Animals from "./pages/Animals";
import Fruits from "./pages/Fruits";
import BodyParts from "./pages/BodyParts";
import ArabicLetters from "./pages/ArabicLetters";
import EnglishWords from "./pages/EnglishWords";
import BanglaWords from "./pages/BanglaWords";
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
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-5px)")
      }
      onMouseLeave={(e) =>
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
      <h1
        style={{
          textAlign: "center",
          fontSize: "50px",
          color: "#ec4899"
        }}
      >
        🎉 Kids Learning App 🎉
      </h1>

      <Section title="📚 Language Learning">
        <Card text="🔤 ABC Keyboard" onClick={() => navigate("/english-alphabet")} />
        <Card text="🔤 স্বরবর্ণ" onClick={() => navigate("/bangla-swaroborno")} />
        <Card text="🔡 ব্যঞ্জনবর্ণ" onClick={() => navigate("/bangla-byanjan")} />
        <Card text="🔢 বাংলা সংখ্যা" onClick={() => navigate("/bangla-numbers")} />
        <Card text="🕌 আরবি বর্ণমালা" onClick={() => navigate("/arabic")} />
        <Card text="🍎 A for Apple" onClick={() => navigate("/english-words")} />
        <Card text="🍎 অ for অজগর" onClick={() => navigate("/bangla-words")} />
      </Section>

      <Section title="🎵 Rhymes & Recitation">
        <Card text="📖 বাংলা ছড়া" onClick={() => navigate("/bangla-rhymes")} />
        <Card text="🎶 English Rhymes (Coming Soon)" />
        <Card text="🎼 গজল (Coming Soon)" />
      </Section>

      <Section title="☪️ Islamic Learning">
        <Card text="📜 সূরা (Coming Soon)" />
        <Card text="🕋 কালেমা (Coming Soon)" />
        <Card text="🤲 দোয়া (Coming Soon)" />
      </Section>

      <Section title="🌍 General Knowledge">
        <Card text="🥦 Vegetables, Fruits & Flowers" onClick={() => navigate("/fruits")} />
        <Card text="🐯 Animals, Birds & Vehicles" onClick={() => navigate("/animals")} />
        <Card text="🧍 Human Body" onClick={() => navigate("/body")} />
      </Section>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/bangla-swaroborno" element={<BanglaSwaroborno />} />
      <Route path="/bangla-byanjan" element={<BanglaByanjan />} />
      <Route path="/bangla-numbers" element={<BanglaNumbers />} />
      <Route path="/bangla-rhymes" element={<BanglaRhymes />} />
      <Route path="/animals" element={<Animals />} />
      <Route path="/fruits" element={<Fruits />} />
      <Route path="/body" element={<BodyParts />} />
      <Route path="/arabic" element={<ArabicLetters />} />
      <Route path="/english-alphabet" element={<EnglishAlphabet />} />
      <Route path="/english-words" element={<EnglishWords />} />
      <Route path="/bangla-words" element={<BanglaWords />} />
    </Routes>
  );
}