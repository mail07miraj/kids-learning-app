import { useRef, useState } from "react";

const letters = [
  { l: "অ", w: "অজগর", audio: "/audio/swaroborno/o.mp3" },
  { l: "আ", w: "আম", audio: "/audio/swaroborno/aa.mp3" },
  { l: "ই", w: "ইলিশ", audio: "/audio/swaroborno/i.mp3" },
  { l: "ঈ", w: "ঈগল", audio: "/audio/swaroborno/ii.mp3" },
  { l: "উ", w: "উট", audio: "/audio/swaroborno/u.mp3" },
  { l: "ঊ", w: "ঊষা", audio: "/audio/swaroborno/uu.mp3" },
  { l: "ঋ", w: "ঋষি", audio: "/audio/swaroborno/ri.mp3" },
  { l: "এ", w: "এলিফ্যান্ট", audio: "/audio/swaroborno/e.mp3" },
  { l: "ঐ", w: "ঐরাবত", audio: "/audio/swaroborno/oi.mp3" },
  { l: "ও", w: "ওল", audio: "/audio/swaroborno/o2.mp3" },
  { l: "ঔ", w: "ঔষধ", audio: "/audio/swaroborno/ou.mp3" }
];

export default function BanglaSwaroborno() {
  const audioRef = useRef(new Audio());
  const [volume, setVolume] = useState(1);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);

  function playSound(index, callback) {
    const audio = audioRef.current;

    audio.pause();
    audio.currentTime = 0;

    audio.src = letters[index].audio;
    audio.volume = volume;
    setActiveIndex(index);

    audio.play();

    audio.onended = () => {
      setActiveIndex(null);
      if (callback) callback();
    };
  }

  function playAll(index = 0) {
    if (index >= letters.length) {
      setIsPlayingAll(false);
      setActiveIndex(null);
      return;
    }

    setIsPlayingAll(true);
    playSound(index, () => playAll(index + 1));
  }

  function stopAll() {
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    setIsPlayingAll(false);
    setActiveIndex(null);
  }

  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        background: "linear-gradient(135deg,#fde68a,#bfdbfe)",
        fontFamily: "Comic Sans MS"
      }}
    >
      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => window.history.back()}>
          ⬅ Back
        </button>

        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          {!isPlayingAll ? (
            <button onClick={() => playAll()}>
              ▶ Play All
            </button>
          ) : (
            <button onClick={stopAll}>
              ⏹ Stop
            </button>
          )}

          <div>
            🔊
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={e => {
                const v = Number(e.target.value);
                setVolume(v);
                audioRef.current.volume = v;
              }}
            />
          </div>
        </div>
      </div>

      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        🔤 স্বরবর্ণ
      </h1>

      <div className="grid">
        {letters.map((item, index) => (
          <div
            key={item.l}
            onClick={() => playSound(index)}
            className={`card ${
              activeIndex === index ? "active" : ""
            }`}
          >
            <div className="letter">{item.l}</div>
            <div>{item.w}</div>
          </div>
        ))}
      </div>

      <style>{`
        .grid {
          margin-top: 30px;
          display: grid;
          gap: 20px;
        }

        @media (max-width: 768px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 769px) {
          .grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }

        .card {
          background: white;
          padding: 20px;
          border-radius: 20px;
          text-align: center;
          cursor: pointer;
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
          transition: 0.2s;
        }

        .card:hover {
          transform: translateY(-5px);
        }

        .active {
          background: #22c55e;
          color: white;
          transform: scale(1.08);
        }

        .letter {
          font-size: 48px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}