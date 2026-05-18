import { fruits } from "../data/fruits";

export default function Fruits() {
  return (
    <div style={{ padding: "20px", fontFamily: "Comic Sans MS" }}>
      <button onClick={() => window.history.back()}>⬅ Back</button>

      <h1 style={{ textAlign: "center" }}>
        🥦 Vegetables, Fruits & Flowers
      </h1>

      <div className="grid">
        {fruits.map((item, i) => (
          <div key={i} className="card">
            <img src={item.img} />
            <p>{item.name}</p>
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

.card img{width:80px;}
`}</style>
    </div>
  );
}