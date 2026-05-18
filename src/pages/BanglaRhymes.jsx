import { useState, useRef, useEffect } from "react";

const rhymes = [
  {
    title: "আমাদের ছোট নদী",
    video: "https://www.youtube.com/embed/9U61EOIX5VQ"
  },
  {
    title: "আয় আয় চাঁদ মামা",
    video: "https://www.youtube.com/embed/y2WDa4pToPM"
  }
];

export default function BanglaRhymes() {
  const [selected, setSelected] = useState(null);
  const [minimized, setMinimized] = useState(false);

  return (
    <div style={{ padding: "20px", fontFamily: "Comic Sans MS" }}>
      <button onClick={() => window.history.back()}>⬅ Back</button>
      <h1 style={{ textAlign: "center" }}>📖 বাংলা ছড়া 📖</h1>

      <div className="grid">
        {rhymes.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setSelected(item);
              setMinimized(false);
            }}
            className="card"
          >
            {item.title}
          </div>
        ))}
      </div>

      {selected && (
        <UnifiedDraggablePlayer
          video={selected.video}
          title={selected.title}
          minimized={minimized}
          setMinimized={setMinimized}
          onClose={() => setSelected(null)}
        />
      )}

      <style>{`
        .grid {
          margin-top: 30px;
          display: grid;
          gap: 20px;
        }

        @media (max-width: 768px) {
          .grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (min-width: 769px) {
          .grid { grid-template-columns: repeat(4, 1fr); }
        }

        .card {
          background: white;
          padding: 30px;
          border-radius: 20px;
          text-align: center;
          cursor: pointer;
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}

/* ============================= */
/* 🔥 SINGLE PLAYER SYSTEM 🔥 */
/* ============================= */

function UnifiedDraggablePlayer({
  video,
  title,
  minimized,
  setMinimized,
  onClose
}) {
  const playerRef = useRef(null);

  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 400,
    y: 100
  });

  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  /* ========================= */
  /* 🖱 DESKTOP DRAG */
  /* ========================= */

  useEffect(() => {
    const move = (e) => {
      if (!dragging.current) return;
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y
      });
    };

    const up = () => (dragging.current = false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  const handleMouseDown = (e) => {
    dragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  /* ========================= */
  /* 📱 MOBILE TOUCH DRAG */
  /* ========================= */

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    dragging.current = true;

    offset.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    };
  };

  const handleTouchMove = (e) => {
    if (!dragging.current) return;

    const touch = e.touches[0];

    setPosition({
      x: touch.clientX - offset.current.x,
      y: touch.clientY - offset.current.y
    });
  };

  const handleTouchEnd = () => {
    dragging.current = false;
  };

  return (
    <>
      {/* Outside click */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "transparent",
          zIndex: 9998
        }}
      />

      <div
        ref={playerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          top: position.y,
          left: position.x,
          width: minimized ? "320px" : "800px",
          height: minimized ? "180px" : "450px",
          background: "black",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          zIndex: 9999,
          transition: "width 0.3s, height 0.3s",
          cursor: "grab",
          touchAction: "none"
        }}
      >
        {/* Title bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "35px",
            background: "rgba(0,0,0,0.7)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 10px",
            zIndex: 2
          }}
        >
          <span style={{ fontSize: "14px" }}>{title}</span>

          <div style={{ display: "flex", gap: "5px" }}>
            <button
              onClick={() => setMinimized(!minimized)}
              style={{
                background: "orange",
                border: "none",
                padding: "2px 6px",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              {minimized ? "⬆" : "—"}
            </button>

            <button
              onClick={onClose}
              style={{
                background: "red",
                border: "none",
                padding: "2px 6px",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              ✖
            </button>
          </div>
        </div>

        <iframe
          src={`${video}?autoplay=1&rel=0`}
          title="YouTube Player"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            pointerEvents: minimized ? "none" : "auto"
          }}
        />
      </div>
    </>
  );
}