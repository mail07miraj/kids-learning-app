const letters = [
  { l: "A", w: "Apple", img: "https://cdn-icons-png.flaticon.com/512/415/415733.png" },
  { l: "B", w: "Ball", img: "https://cdn-icons-png.flaticon.com/512/861/861512.png" },
  { l: "C", w: "Cat", img: "https://cdn-icons-png.flaticon.com/512/616/616430.png" },
  { l: "D", w: "Dog", img: "https://cdn-icons-png.flaticon.com/512/616/616408.png" },
  { l: "E", w: "Elephant", img: "https://cdn-icons-png.flaticon.com/512/1998/1998610.png" },
  { l: "F", w: "Fish", img: "https://cdn-icons-png.flaticon.com/512/616/616408.png" },
  { l: "G", w: "Grapes", img: "https://cdn-icons-png.flaticon.com/512/415/415682.png" },
  { l: "H", w: "Horse", img: "https://cdn-icons-png.flaticon.com/512/1998/1998610.png" },
  { l: "I", w: "Ice Cream", img: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png" },
  { l: "J", w: "Juice", img: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png" },
  { l: "K", w: "Kite", img: "https://cdn-icons-png.flaticon.com/512/869/869869.png" },
  { l: "L", w: "Lion", img: "https://cdn-icons-png.flaticon.com/512/616/616412.png" },
  { l: "M", w: "Mango", img: "https://cdn-icons-png.flaticon.com/512/686/686655.png" },
  { l: "N", w: "Nest", img: "https://cdn-icons-png.flaticon.com/512/869/869869.png" },
  { l: "O", w: "Orange", img: "https://cdn-icons-png.flaticon.com/512/415/415682.png" },
  { l: "P", w: "Parrot", img: "https://cdn-icons-png.flaticon.com/512/616/616490.png" },
  { l: "Q", w: "Queen", img: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png" },
  { l: "R", w: "Rabbit", img: "https://cdn-icons-png.flaticon.com/512/616/616408.png" },
  { l: "S", w: "Sun", img: "https://cdn-icons-png.flaticon.com/512/869/869869.png" },
  { l: "T", w: "Tiger", img: "https://cdn-icons-png.flaticon.com/512/616/616408.png" },
  { l: "U", w: "Umbrella", img: "https://cdn-icons-png.flaticon.com/512/869/869869.png" },
  { l: "V", w: "Van", img: "https://cdn-icons-png.flaticon.com/512/744/744465.png" },
  { l: "W", w: "Watermelon", img: "https://cdn-icons-png.flaticon.com/512/135/135620.png" },
  { l: "X", w: "Xylophone", img: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png" },
  { l: "Y", w: "Yacht", img: "https://cdn-icons-png.flaticon.com/512/2942/2942789.png" },
  { l: "Z", w: "Zebra", img: "https://cdn-icons-png.flaticon.com/512/616/616408.png" }
];

// 🔊 আগের মতোই female voice sound
function playSound(letter, word) {
  const synth = window.speechSynthesis;

  const u = new SpeechSynthesisUtterance(`${letter} for ${word}`);
  u.lang = "en-US";
  u.rate = 0.75;
  u.pitch = 1.3;

  const voices = synth.getVoices();
  const female =
    voices.find(v => v.name.toLowerCase().includes("zira")) ||
    voices.find(v => v.name.toLowerCase().includes("samantha")) ||
    voices.find(v => v.lang === "en-US");

  if (female) u.voice = female;

  synth.cancel(); // আগের sound stop
  synth.speak(u);
}

export default function English() {
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Comic Sans MS",
        background: "#fff7ed",
        minHeight: "100vh"
      }}
    >
      <h1 style={{ textAlign: "center" }}>📗 English Alphabet (A–Z)</h1>

      <button
        onClick={() => window.history.back()}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "#fb923c",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        ⬅️ Back
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "16px"
        }}
      >
        {letters.map((it) => (
          <div
            key={it.l}
            onClick={() => playSound(it.l, it.w)}
            style={{
              background: "#ffffff",
              padding: "12px",
              borderRadius: "16px",
              textAlign: "center",
              cursor: "pointer",
              boxShadow: "0 6px 12px rgba(0,0,0,0.12)"
            }}
          >
            <div style={{ fontSize: "32px", fontWeight: "bold" }}>{it.l}</div>
            <img
              src={it.img}
              alt={it.w}
              style={{ width: "60px", height: "60px", margin: "8px 0" }}
            />
            <div style={{ fontSize: "16px" }}>{it.w}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
