import React from "react";

const NumbersChart = () => {
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  const speakNumber = (num) => {
    const utterance = new SpeechSynthesisUtterance(
      `This is number ${num}`
    );
    utterance.lang = "en-US"; // চাইলে "bn-BD"
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔢 Numbers 1 – 100</h2>

      <div style={styles.grid}>
        {numbers.map((num) => (
          <button
            key={num}
            style={styles.card}
            onClick={() => speakNumber(num)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    marginBottom: "15px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "10px",
    maxHeight: "70vh",
    overflowY: "auto",
  },
  card: {
    fontSize: "24px",
    padding: "20px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#FFD966",
    cursor: "pointer",
  },
};

export default NumbersChart;
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