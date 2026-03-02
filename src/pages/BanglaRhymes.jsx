import { useState } from "react";

const rhymes = [
  {
    title: "আমাদের ছোট নদী",
    drive: "https://drive.google.com/file/d/YOUR_FILE_ID/preview"
  },
  {
    title: "আয় আয় চাঁদ মামা",
    drive: "https://drive.google.com/file/d/YOUR_FILE_ID/preview"
  }
];

export default function BanglaRhymes() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ padding: "20px", fontFamily: "Comic Sans MS" }}>
      <button onClick={() => window.history.back()}>⬅ Back</button>

      <h1 style={{ textAlign: "center" }}>📖 বাংলা ছড়া</h1>

      <div className="grid">
        {rhymes.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelected(item)}
            className="card"
          >
            {item.title}
          </div>
        ))}
      </div>

      {/* 🎬 Popup Player */}
      {selected && (
  <div
    className="modal"
    onClick={() => setSelected(null)}  // 👈 Outside click close
  >
    <div
      className="playerBox"
      onClick={(e) => e.stopPropagation()} // 👈 ভিতরে ক্লিক করলে বন্ধ হবে না
    >
      <div className="topBar">
        <span>{selected.title}</span>
        <button onClick={() => setSelected(null)}>✖</button>
      </div>

      <iframe
        src={selected.drive}
        width="100%"
        height="400"
        allow="autoplay"
        allowFullScreen
        style={{ borderRadius: "12px", border: "none" }}
      ></iframe>
    </div>
  </div>
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
          transition: 0.2s;
        }

        .card:hover {
          transform: translateY(-5px);
        }

        .modal {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .playerBox {
          background: #fff;
          width: 90%;
          max-width: 800px;
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          animation: fadeIn 0.3s ease;
        }

        .topBar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .topBar button {
          background: red;
          color: white;
          border: none;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          cursor: pointer;
          font-size: 18px;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}