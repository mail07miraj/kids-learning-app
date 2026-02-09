import { useEffect, useState } from "react";
import KeyboardLayout from "../components/KeyboardLayout";
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function randomLetter() {
  return letters[Math.floor(Math.random() * letters.length)];
}

export default function LetterQuiz() {
  const [target, setTarget] = useState(randomLetter());
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  function speak(text) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.8;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  function check(answer) {
    if (answer === target) {
      setMsg("🎉 Great job!");
      setSuccess(true);
      setShowConfetti(true);
      speak("Great job");

      setTimeout(() => {
        setSuccess(false);
        setShowConfetti(false);
        setMsg("");
        setTarget(randomLetter());
      }, 1500);
    } else {
      setMsg("❌ Try again");
      speak("Try again");
    }
  }

  // ⌨️ Keyboard support
  useEffect(() => {
    function onKey(e) {
      const key = e.key.toUpperCase();
      if (letters.includes(key)) {
        check(key);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [target]);

  return (
    <>
      {/* 🎉 Confetti */}
      {showConfetti && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 9999,
            overflow: "hidden"
          }}
        >
          {Array.from({ length: 80 }).map((_, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                top: "-10px",
                left: Math.random() * 100 + "vw",
                width: "8px",
                height: "14px",
                background: ["#22c55e","#3b82f6","#fde68a","#ef4444","#a855f7"][i % 5],
                animation: `fall ${1.5 + Math.random()}s linear`
              }}
            />
          ))}
        </div>
      )}

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#c7d2fe,#fde68a,#bbf7d0)",
          fontFamily: "Comic Sans MS",
          padding: "20px",
          textAlign: "center"
        }}
      >
        <h1>🎮 Find the Letter</h1>

        {/* 🎯 Target letter */}
        <div
          style={{
            margin: "20px auto",
            width: "200px",
            height: "200px",
            borderRadius: "30px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "120px",
            fontWeight: "bold",
            color: "#1d4ed8",
            boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
            animation: success ? "pop 0.4s" : "none"
          }}
        >
          {target}
        </div>

        <div style={{ fontSize: "28px", height: "40px" }}>{msg}</div>

        {/* 🔤 Alphabet buttons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "12px",
            maxWidth: "600px",
            margin: "30px auto"
          }}
        >
          {letters.map(l => (
            <button
              key={l}
              onClick={() => check(l)}
              style={{
                padding: "14px 0",
                fontSize: "26px",
                borderRadius: "16px",
                border: "none",
                background: "#3b82f6",
                color: "#fff",
                cursor: "pointer",
                boxShadow: "0 6px 14px rgba(0,0,0,0.25)"
              }}
            >
              {l}
            </button>
          ))}
        </div>

        <button
          onClick={() => window.history.back()}
          style={{
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

        <style>
          {`
            @keyframes fall {
              to {
                transform: translateY(110vh) rotate(360deg);
                opacity: 0;
              }
            }
            @keyframes pop {
              0% { transform: scale(1); }
              50% { transform: scale(1.2); }
              100% { transform: scale(1); }
            }
          `}
        </style>
      </div>
    </>
  );
}
