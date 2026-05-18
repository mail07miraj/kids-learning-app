import { animals } from "../data/animals";

export default function Animals() {
  return (
    <div style={container}>
      <button style={backBtn} onClick={() => window.history.back()}>
        ⬅ Back
      </button>

      <h1 style={title}>🐯 Animals, Birds & Vehicles</h1>

      <div className="grid">
        {animals.map((item, i) => (
          <div key={i} className="card">
            <img src={item.img} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>

      <style>{gridStyle}</style>
    </div>
  );
}

const container = { padding: "20px", fontFamily: "Comic Sans MS" };
const title = { textAlign: "center" };

const backBtn = {
  padding: "10px 20px",
  borderRadius: "12px",
  border: "none",
  cursor: "pointer"
};

const gridStyle = `
.grid{
margin-top:30px;
display:grid;
gap:20px;
}

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

.card img{
width:80px;
}
`;