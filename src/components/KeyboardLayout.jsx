import { useEffect, useState, useRef } from "react";

export default function KeyboardLayout({
  data,
  lang = "en-US",
  speakText,
  title
}) {
  const [index, setIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 🔽 Install popup state (ONLY THIS, duplicate removed)
  const [showInstall, setShowInstall] = useState(false);
  const deferredPromptRef = useRef(null);

  const item = data[index];

  const touchStartX = useRef(0);
  const mouseStartX = useRef(0);

  if (!item) return null;

  // 🔊 Speak (Bangla + English safe)
  function speak(text) {
    const synth = window.speechSynthesis;

    // Bangla lazy-load fix
    synth.getVoices();
    synth.cancel();

    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.75;
    u.pitch = 1.2;

    const voices = synth.getVoices();

    const voice =
      // Bangla voice
      voices.find(v => lang.startsWith("bn") && v.lang.startsWith("bn")) ||
      // English female
      voices.find(v => v.name.toLowerCase().includes("zira")) ||
      voices.find(v => v.name.toLowerCase().includes("samantha")) ||
      // Fallback
      voices.find(v => v.lang === lang) ||
      voices[0];

    if (voice) u.voice = voice;
    synth.speak(u);
  }

  // 🔊 Auto speak on change
  useEffect(() => {
    speak(speakText(item));
  }, [index, lang, data]);

  // ⌨️ Keyboard (Arrow + A–Z)
  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowRight") return next();
      if (e.key === "ArrowLeft") return prev();

      // English A–Z support
      if (lang.startsWith("en")) {
        const key = e.key.toUpperCase();
        const foundIndex = data.findIndex(i => i.l === key);
        if (foundIndex !== -1) setIndex(foundIndex);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [data, lang]);

  // 📱 Touch swipe
  useEffect(() => {
    function onTouchStart(e) {
      touchStartX.current = e.touches[0].clientX;
    }
    function onTouchEnd(e) {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (diff > 60) next();
      if (diff < -60) prev();
    }

    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // 🖱️ Mouse drag
  useEffect(() => {
    function onMouseDown(e) {
      mouseStartX.current = e.clientX;
    }
    function onMouseUp(e) {
      const diff = mouseStartX.current - e.clientX;
      if (diff > 80) next();
      if (diff < -80) prev();
    }

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // 📲 Install prompt listener
  useEffect(() => {
    function handleInstallPrompt(e) {
      e.preventDefault();
      deferredPromptRef.current = e;
      setShowInstall(true);
    }

    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    return () =>
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
  }, []);

  // 🟢 Fullscreen toggle
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }

  function next() {
    setIndex(i => (i + 1) % data.length);
  }

  function prev() {
    setIndex(i => (i === 0 ? data.length - 1 : i - 1));
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#c7d2fe,#fde68a,#bbf7d0)",
        fontFamily: "Comic Sans MS",
        padding: "20px"
      }}
    >
      {/* 🔝 Top Bar */}
      <div
  style={{
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap"
  }}
>

        <button style={topBtn} onClick={() => window.history.back()}>
          ⬅️ Back
        </button>

        <button style={topBtn} onClick={toggleFullscreen}>
          {isFullscreen ? "❌ Exit" : "⛶ Fullscreen"}
        </button>

        {showInstall && (
          <button
            style={{ ...topBtn, background: "#22c55e" }}
            onClick={async () => {
              const prompt = deferredPromptRef.current;
              if (!prompt) return;

              await prompt.prompt();
              await prompt.userChoice;

              deferredPromptRef.current = null;
              setShowInstall(false);
            }}
          >
            📲 Install App
          </button>
        )}
      </div>

      <h2 style={{ textAlign: "center" }}>{title}</h2>

      {/* 🎴 Main Card */}
      <div
  style={{
    marginTop: "30px",
    background: "linear-gradient(180deg,#ffffff,#f8fafc)",
    borderRadius: "32px",
    padding: "40px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px"
  }}
>
        <div style={{ textAlign: "center", flex: 1 }}>
          <div
            style={{ fontSize: "160px", color: "#2563eb", cursor: "pointer" }}
            onClick={() => speak(speakText(item))}
          >
            {item.l}
          </div>

          <div style={{ fontSize: "40px", marginTop: "12px" }}>
            {speakText(item)}
          </div>
        </div>

        <div style={{ textAlign: "center", flex: 1 }}>
          <img
            src={item.img}
            alt={item.w}
            onClick={() => speak(speakText(item))}
            style={{
              width: "240px",
              cursor: "pointer",
              animation: "float 2.5s ease-in-out infinite"
            }}
          />
        </div>
      </div>

      {/* ⬅️➡️ Mobile-style Navigation */}
<div
  style={{
    position: "fixed",
    bottom: "30px",
    left: "0",
    right: "0",
    display: "flex",
    justifyContent: "space-between",
    padding: "0 30px",
    pointerEvents: "none"
  }}
>
  <button
    style={{ ...navBtn, pointerEvents: "auto" }}
    onClick={prev}
  >
    ⬅️
  </button>

  <button
    style={{ ...navBtn, pointerEvents: "auto" }}
    onClick={next}
  >
    ➡️
  </button>
</div>


      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-18px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

const topBtn = {
  padding: "10px 16px",
  borderRadius: "14px",
  border: "none",
  background: "linear-gradient(135deg,#4f46e5,#3b82f6)",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
  transition: "transform 0.15s"
};


const navBtn = {
  fontSize: "36px",
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  border: "none",
  cursor: "pointer",
  background: "linear-gradient(135deg,#22c55e,#16a34a)",
  color: "#fff",
  boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
  transition: "transform 0.12s"
};

