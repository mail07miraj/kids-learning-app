import { useRef, useState } from "react";

const letters = [
  { l: "ক", w: "কলা", audio: "/audio/byanjan/ko.mp3" },
  { l: "খ", w: "খরগোশ", audio: "/audio/byanjan/kho.mp3" },
  { l: "গ", w: "গরু", audio: "/audio/byanjan/go.mp3" },
  { l: "ঘ", w: "ঘোড়া", audio: "/audio/byanjan/gho.mp3" },
  { l: "ঙ", w: "ঙা", audio: "/audio/byanjan/ngo.mp3" },
  // বাকিগুলো একইভাবে যোগ করবে
];

export default function BanglaByanjan() {
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
    <div style={{ padding: "20px", fontFamily: "Comic Sans MS" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => window.history.back()}>⬅ Back</button>

        <div>
          {!isPlayingAll ? (
            <button onClick={() => playAll()}>▶ Play All</button>
          ) : (
            <button onClick={stopAll}>⏹ Stop</button>
          )}
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

      <h1 style={{ textAlign: "center" }}>🔡 ব্যঞ্জনবর্ণ</h1>

      <div className="grid">
        {letters.map((item, index) => (
          <div
            key={item.l}
            onClick={() => playSound(index)}
            className={`card ${activeIndex === index ? "active" : ""}`}
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
          .grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (min-width: 769px) {
          .grid { grid-template-columns: repeat(5, 1fr); }
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

        .active {
          background: #22c55e;
          color: white;
          transform: scale(1.08);
        }

        .letter {
          font-size: 40px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}