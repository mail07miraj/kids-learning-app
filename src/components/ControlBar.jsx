import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ControlBar({
  onPlay,
  onStop,
  isPlaying = false,
  isMuted = false,
  volume = 1,
  onToggleMute,
  onVolumeChange,
}) {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen?.();
      } else {
        await document.exitFullscreen?.();
      }
    } catch {
      // Fullscreen is an enhancement; the lesson remains fully usable without it.
    }
  }

  return (
    <div className="lesson-toolbar" aria-label="Lesson controls">
      <button className="toolbar-button toolbar-button--soft" onClick={() => navigate(-1)} type="button">
        <span aria-hidden="true">←</span> Back
      </button>
      <div className="toolbar-spacer" />
      <button className="toolbar-button toolbar-button--play" onClick={onPlay} type="button" aria-pressed={isPlaying}>
        <span aria-hidden="true">{isPlaying ? "♫" : "▶"}</span> {isPlaying ? "Playing" : "Play sound"}
      </button>
      <button className="toolbar-button toolbar-button--soft" onClick={onStop} type="button">
        <span aria-hidden="true">■</span> Stop
      </button>
      <button className="toolbar-button toolbar-button--soft" onClick={onToggleMute} type="button" aria-pressed={isMuted}>
        <span aria-hidden="true">{isMuted ? "🔇" : "🔊"}</span> {isMuted ? "Unmute" : "Mute"}
      </button>
      <label className="volume-control">
        <span aria-hidden="true">🔈</span>
        <input
          aria-label="Volume"
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(event) => onVolumeChange(Number(event.target.value))}
        />
        <span aria-hidden="true">🔊</span>
      </label>
      <button className="toolbar-button toolbar-button--soft" onClick={toggleFullscreen} type="button">
        <span aria-hidden="true">⛶</span> {isFullscreen ? "Exit" : "Full screen"}
      </button>
    </div>
  );
}
