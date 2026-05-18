import { arabic } from "../data/arabic";
import LearningGrid from "../components/LearningGrid";
export default function ArabicLetters() {
  return (
    <div style={{ padding: "20px", fontFamily: "Comic Sans MS" }}>
      <button onClick={() => window.history.back()}>⬅ Back</button>

      <h1 style={{ textAlign: "center" }}>🕌 Arabic Letters</h1>

      <div className="grid">
        {arabic.map((item, i) => (
          <div key={i} className="card">
            <div className="letter">{item.l}</div>
            <p>{item.w}</p>
          </div>
        ))}
      </div>

      <style>{`
.grid{margin-top:30px;display:grid;gap:20px;}

@media(max-width:768px){
grid-template-columns:repeat(3,1fr);
}

@media(min-width:769px){
grid-template-columns:repeat(5,1fr);
}

.card{
background:white;
padding:20px;
border-radius:20px;
text-align:center;
box-shadow:0 8px 16px rgba(0,0,0,0.2);
}

.letter{
font-size:50px;
font-weight:bold;
}
`}</style>
    </div>
  );
}