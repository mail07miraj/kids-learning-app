import { useState } from "react";

const numbers = [
  { n: "১", w: "এক" },
  { n: "২", w: "দুই" },
  { n: "৩", w: "তিন" },
  { n: "৪", w: "চার" },
  { n: "৫", w: "পাঁচ" },
  { n: "৬", w: "ছয়" },
  { n: "৭", w: "সাত" },
  { n: "৮", w: "আট" },
  { n: "৯", w: "নয়" },
  { n: "১০", w: "দশ" }
];

export default function BanglaNumbers() {
  const [activeIndex, setActiveIndex] = useState(null);

  function handleClick(index) {
    setActiveIndex(index);
    setTimeout(() => setActiveIndex(null), 500);
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Comic Sans MS" }}>
      <button onClick={() => window.history.back()}>⬅ Back</button>

      <h1 style={{ textAlign: "center" }}>🔢 বাংলা সংখ্যা</h1>

      <div className="grid">
        {numbers.map((item, index) => (
          <div
            key={item.n}
            onClick={() => handleClick(index)}
            className={`card ${
              activeIndex === index ? "active" : ""
            }`}
          >
            <div className="num">{item.n}</div>
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
          background: #3b82f6;
          color: white;
          transform: scale(1.08);
        }

        .num {
          font-size: 48px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}