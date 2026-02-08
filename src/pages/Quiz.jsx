import { useState } from "react";

const questions = [
  {
    l: "A",
    correct: "Apple",
    options: ["Apple", "Ball", "Cat"]
  },
  {
    l: "B",
    correct: "Ball",
    options: ["Apple", "Ball", "Dog"]
  },
  {
    l: "C",
    correct: "Cat",
    options: ["Cat", "Ball", "Egg"]
  }
];

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [msg, setMsg] = useState("");

  const q = questions[index];

  function speak(text) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.8;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  function check(ans) {
    if (ans === q.correct) {
      setMsg("✅ Good job!");
      speak("Good job");
      setTimeout(() => {
        setMsg("");
        setIndex(i => (i + 1) % questions.length);
      }, 1200);
    } else {
      setMsg("❌ Try again");
      speak("Try again");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#bbf7d0,#fde68a)",
        fontFamily: "Comic Sans MS",
        padding: "30px",
        textAlign: "center"
      }}
    >
      <h1>🎮 Fun Quiz</h1>

      <div style={{ fontSize: "140px", color: "#1d4ed8" }}>
        {q.l}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap"
        }}
      >
        {q.options.map(opt => (
          <button
            key={opt}
            onClick={() => check(opt)}
            style={{
              padding: "16px 24px",
              fontSize: "22px",
              borderRadius: "14px",
              border: "none",
              background: "#3b82f6",
              color: "#fff",
              cursor: "pointer",
              boxShadow: "0 6px 14px rgba(0,0,0,0.25)"
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "20px", fontSize: "26px" }}>
        {msg}
      </div>

      <button
        onClick={() => window.history.back()}
        style={{
          marginTop: "40px",
          padding: "10px 18px",
          borderRadius: "12px",
          border: "none",
          background: "#22c55e",
          color: "#fff",
          fontSize: "18px",
          cursor: "pointer"
        }}
      >
        ⬅️ Back
      </button>
    </div>
  );
}
