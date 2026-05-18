import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ControlBar({ playAll, stopSound }) {

  const navigate = useNavigate();

  const [volume, setVolume] = useState(1);
  const [mute, setMute] = useState(false);

  function toggleFullscreen(){

    if(!document.fullscreenElement){
      document.documentElement.requestFullscreen();
    }else{
      document.exitFullscreen();
    }

  }

  return (

    <div className="controlBar">

      <button onClick={()=>navigate(-1)}>
        ⬅ Back
      </button>

      <button onClick={playAll}>
        ▶ Play
      </button>

      <button onClick={stopSound}>
        ⏹ Stop
      </button>

      <button onClick={()=>setMute(!mute)}>
        {mute ? "🔈 Unmute" : "🔇 Mute"}
      </button>

      <button onClick={toggleFullscreen}>
        ⛶ Fullscreen
      </button>

      <label>
        🔊
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e)=>setVolume(e.target.value)}
        />
      </label>

      <style>{`

      .controlBar{

        display:flex;
        gap:10px;
        flex-wrap:wrap;
        margin-bottom:20px;

      }

      .controlBar button{

        border:none;
        padding:10px 16px;
        border-radius:12px;
        background:#3b82f6;
        color:white;
        font-weight:bold;
        cursor:pointer;

      }

      `}</style>

    </div>

  );
}