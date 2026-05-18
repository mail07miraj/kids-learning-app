import { useEffect, useState, useRef } from "react";

export default function KeyboardLayout({
  data,
  title
}) {
  const [index, setIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [showInstall, setShowInstall] = useState(false);
  const deferredPromptRef = useRef(null);

  const item = data[index];

  const audioRef = useRef(null);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const mouseStartX = useRef(0);
  const lastTap = useRef(0);

  if (!item) return null;

  // 🔊 PLAY AUDIO
  function playSound() {
    if (!item.audio) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(item.audio);
    audio.volume = 1;

    audioRef.current = audio;
    audio.play();
  }

  // 🔇 STOP AUDIO
  function stopSound() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }

  // 🔊 AUTO PLAY
  useEffect(() => {
    playSound();
  }, [index]);

  // ⌨️ KEYBOARD CONTROL
  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // 📱 TOUCH GESTURE
  useEffect(() => {
    function onTouchStart(e) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;

      const now = Date.now();
      if (now - lastTap.current < 300) toggleFullscreen();
      lastTap.current = now;
    }

    function onTouchEnd(e) {
      const dx = touchStartX.current - e.changedTouches[0].clientX;
      const dy = touchStartY.current - e.changedTouches[0].clientY;

      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 60) next();
        if (dx < -60) prev();
      } else {
        if (dy < -60) playSound();
        if (dy > 60) stopSound();
      }
    }

    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [item]);

  // 🖱️ MOUSE SWIPE
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

  // 📲 INSTALL PROMPT
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
      {/* TOP BAR */}

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button style={topBtn} onClick={() => window.history.back()}>
          ⬅ Back
        </button>

        <button style={topBtn} onClick={toggleFullscreen}>
          {isFullscreen ? "Exit" : "Fullscreen"}
        </button>

        <button style={topBtn} onClick={playSound}>
          🔊 Play
        </button>

        <button style={topBtn} onClick={stopSound}>
          🔇 Stop
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
            Install App
          </button>
        )}
      </div>

      <h2 style={{ textAlign: "center" }}>{title}</h2>

      {/* MAIN CARD */}

      <div
        style={{
          marginTop: "30px",
          background: "white",
          borderRadius: "30px",
          padding: "40px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px"
        }}
      >
        <div style={{ textAlign: "center", flex: 1 }}>
          <div
            style={{
              fontSize: "160px",
              color: "#2563eb",
              cursor: "pointer"
            }}
            onClick={playSound}
          >
            {item.l}
          </div>

          <div style={{ fontSize: "40px", marginTop: "10px" }}>
            {item.w}
          </div>
        </div>

        <div style={{ flex: 1, textAlign: "center" }}>
          <img
            src={item.img}
            alt=""
            style={{
              width: "240px",
              cursor: "pointer",
              animation: "float 2.5s ease-in-out infinite"
            }}
            onClick={playSound}
          />
        </div>
      </div>

      {/* NAVIGATION */}

      <div
        style={{
          position: "fixed",
          bottom: "30px",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          padding: "0 30px"
        }}
      >
        <button style={navBtn} onClick={prev}>
          ⬅
        </button>

        <button style={navBtn} onClick={next}>
          ➡
        </button>
      </div>

      <style>
        {`
        @keyframes float{
        0%{transform:translateY(0)}
        50%{transform:translateY(-18px)}
        100%{transform:translateY(0)}
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
  background: "#3b82f6",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold"
};

const navBtn = {
  width: "90px",
  height: "90px",
  fontSize: "36px",
  borderRadius: "50%",
  border: "none",
  background: "#22c55e",
  color: "white",
  cursor: "pointer",
  boxShadow: "0 10px 20px rgba(0,0,0,0.3)"
};