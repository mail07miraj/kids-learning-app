import { useState, useRef } from "react";
import ControlBar from "./ControlBar";

export default function LearningGrid({ title, data }) {

  const [active, setActive] = useState(null);
  const audioRef = useRef(null);

  function playSound(item, index) {

    if (!item.audio) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(item.audio);
    audioRef.current = audio;

    setActive(index);

    audio.play();
  }

  function stopSound(){

    if(audioRef.current){
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setActive(null);
  }

  async function playAll(){

    for(let i=0;i<data.length;i++){

      setActive(i);

      const item = data[i];

      if(!item.audio) continue;

      await new Promise(resolve=>{

        const audio = new Audio(item.audio);

        audioRef.current = audio;

        audio.onended = resolve;

        audio.play();

      });

    }

    setActive(null);

  }

  return (

    <div
      style={{
        fontFamily:"Comic Sans MS",
        minHeight:"100vh",
        background:"linear-gradient(135deg,#fef9c3,#bfdbfe)",
        padding:"20px"
      }}
    >

      {/* CONTROL BAR */}

      <ControlBar
        playAll={playAll}
        stopSound={stopSound}
      />

      <h1 style={{textAlign:"center"}}>
        {title}
      </h1>

      {/* GRID */}

      <div className="grid">

        {data.map((item,index)=>(

          <div
            key={index}
            className={`card ${active===index?"active":""}`}
            onClick={()=>playSound(item,index)}
          >

            <div className="letter">
              {item.label}
            </div>

            <div className="word">
              {item.word}
            </div>

            {item.img && (
              <img src={item.img} alt="" />
            )}

          </div>

        ))}

      </div>

      <style>{`

      .grid{
        margin-top:30px;
        display:grid;
        gap:20px;
      }

      @media(max-width:768px){
        .grid{
          grid-template-columns:repeat(3,1fr);
        }
      }

      @media(min-width:769px){
        .grid{
          grid-template-columns:repeat(5,1fr);
        }
      }

      .card{
        background:white;
        border-radius:20px;
        padding:20px;
        text-align:center;
        cursor:pointer;
        box-shadow:0 10px 20px rgba(0,0,0,0.15);
        transition:0.2s;
      }

      .card:hover{
        transform:translateY(-5px);
      }

      .card.active{
        background:#dbeafe;
        border:3px solid #2563eb;
      }

      .letter{
        font-size:60px;
        font-weight:bold;
      }

      .word{
        margin-top:5px;
        font-size:20px;
      }

      img{
        width:70px;
        margin-top:10px;
      }

      `}</style>

    </div>

  );
}