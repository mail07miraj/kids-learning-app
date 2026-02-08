import { Routes, Route, useNavigate } from "react-router-dom";
import Numbers from "./pages/Numbers";
import EnglishKeyboard from "./pages/EnglishKeyboard";
import BanglaKeyboard from "./pages/BanglaKeyboard";
import LetterQuiz from "./pages/LetterQuiz";

function Home() {
  const navigate = useNavigate();

  // reusable animated card
  const AnimatedCard = ({ onClick, children }) => (
    <div
      style={cardStyle}
      onClick={onClick}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-6px) scale(1.03)";
        e.currentTarget.style.boxShadow =
          "0 18px 32px rgba(0,0,0,0.25)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow =
          "0 10px 20px rgba(0,0,0,0.18)";
      }}
    >
      {children}
    </div>
  );

  return (
    <div
      style={{
        fontFamily: "Comic Sans MS",
        backgroundColor: "#fef9c3",
        minHeight: "100vh",
        padding: "20px",
        animation: "fadeIn 0.6s ease"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#ec4899",
          fontSize: "50px",
          marginBottom: "20px"
        }}
      >
        🎉 Kids Learning App 🎉
      </h1>

      {/* ENGLISH */}
      <h1>📘 English Learning</h1>
      <div style={cardWrap}>
        <AnimatedCard onClick={() => navigate("/english-keyboard")}>
          <h2 style={floatText}>⌨️ ABC Keyboard</h2>
          <p>A–Z with Sound</p>
        </AnimatedCard>

        <AnimatedCard onClick={() => navigate("/numbers")}>
          <div style={numberBox}>1&nbsp;2&nbsp;3</div>
          <p style={{ fontSize: "18px", marginTop: "10px" }}>
            Numbers
          </p>
        </AnimatedCard>

        <AnimatedCard onClick={() => navigate("/letter-quiz")}>
          <h2 style={floatText}>🎮 Letter Quiz</h2>
          <p>Find the Alphabet</p>
        </AnimatedCard>
      </div>

      {/* BANGLA */}
      <h2 style={{ marginTop: "40px" }}>📕 বাংলা শেখা</h2>
      <div style={cardWrap}>
        <AnimatedCard onClick={() => navigate("/bangla-keyboard")}>
          <h3 style={floatText}>🍌 ফল / 🐯 প্রাণী</h3>
        </AnimatedCard>
      </div>

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/english-keyboard" element={<EnglishKeyboard />} />
      <Route path="/numbers" element={<Numbers />} />
      <Route path="/bangla-keyboard" element={<BanglaKeyboard />} />
      <Route path="/letter-quiz" element={<LetterQuiz />} />
    </Routes>
  );
}

/* ===== STYLES ===== */

const cardWrap = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "24px",
  marginTop: "20px"
};

const cardStyle = {
  backgroundColor: "#fff",
  padding: "24px",
  borderRadius: "24px",
  textAlign: "center",
  cursor: "pointer",
  boxShadow: "0 10px 20px rgba(0,0,0,0.18)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease"
};

const floatText = {
  animation: "float 3s ease-in-out infinite"
};

const numberBox = {
  fontSize: "64px",
  fontWeight: "bold",
  color: "#2563eb",
  background: "#eef2ff",
  borderRadius: "18px",
  padding: "12px 20px",
  display: "inline-block",
  letterSpacing: "6px",
  animation: "float 3s ease-in-out infinite"
};
