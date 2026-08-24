import { useCallback, useEffect, useRef, useState } from "react";
import ControlBar from "./ControlBar";

function getLabel(item) {
  return item?.label ?? item?.l ?? "";
}

function getWord(item) {
  return item?.word ?? item?.w ?? "";
}

function getSpokenText(item) {
  const label = getLabel(item);
  const word = getWord(item);
  return word ? `${label}. ${word}` : label;
}

export default function LearningGrid({ title, data = [] }) {
  const [active, setActive] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);
  const speechRef = useRef(null);
  const playIdRef = useRef(0);

  const stopSound = useCallback(() => {
    playIdRef.current += 1;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    speechRef.current = null;
    setActive(null);
    setIsPlaying(false);
  }, []);

  useEffect(() => () => stopSound(), [stopSound]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.muted = isMuted;
    }
  }, [isMuted, volume]);

  const speakFallback = useCallback((item, index, playId) => {
    if (isMuted || !window.speechSynthesis) {
      setActive(null);
      setIsPlaying(false);
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(getSpokenText(item));
      utterance.lang = "en-US";
      utterance.rate = 0.86;
      utterance.pitch = 1.12;
      utterance.volume = volume;
      speechRef.current = utterance;
      utterance.onend = () => {
        if (playIdRef.current === playId) {
          setActive(null);
          setIsPlaying(false);
        }
        resolve();
      };
      utterance.onerror = () => {
        if (playIdRef.current === playId) {
          setActive(null);
          setIsPlaying(false);
        }
        resolve();
      };
      setActive(index);
      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    });
  }, [isMuted, volume]);

  const playItem = useCallback(async (item, index, shouldInterrupt = true) => {
    if (!item) return;
    if (shouldInterrupt) stopSound();
    const playId = playIdRef.current;
    setActive(index);
    setIsPlaying(true);

    if (!item.audio) {
      await speakFallback(item, index, playId);
      return;
    }

    const audio = new Audio(item.audio);
    audio.volume = isMuted ? 0 : volume;
    audio.muted = isMuted;
    audioRef.current = audio;

    await new Promise((resolve) => {
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        if (playIdRef.current === playId) {
          audioRef.current = null;
          setActive(null);
          setIsPlaying(false);
        }
        resolve();
      };
      const fallback = async () => {
        if (settled) return;
        settled = true;
        audio.pause();
        audioRef.current = null;
        await speakFallback(item, index, playId);
        resolve();
      };
      audio.onended = finish;
      audio.onerror = fallback;
      const playPromise = audio.play();
      if (playPromise) {
        playPromise.catch(fallback);
      }
    });
  }, [isMuted, speakFallback, stopSound, volume]);

  const playSound = useCallback((item, index) => {
    void playItem(item, index);
  }, [playItem]);

  const playAll = useCallback(async () => {
    stopSound();
    const sequenceId = playIdRef.current;
    for (let index = 0; index < data.length; index += 1) {
      if (playIdRef.current !== sequenceId) break;
      await playItem(data[index], index, false);
    }
  }, [data, playItem, stopSound]);

  function handleMute() {
    setIsMuted((muted) => !muted);
  }

  return (
    <main className="lesson-shell">
      <div className="lesson-background-shape lesson-background-shape--one" aria-hidden="true" />
      <div className="lesson-background-shape lesson-background-shape--two" aria-hidden="true" />
      <div className="lesson-content">
        <ControlBar
          onPlay={playAll}
          onStop={stopSound}
          isPlaying={isPlaying}
          isMuted={isMuted}
          volume={volume}
          onToggleMute={handleMute}
          onVolumeChange={setVolume}
        />
        <header className="lesson-heading">
          <span className="lesson-heading__sparkle" aria-hidden="true">✦</span>
          <h1>{title}</h1>
          <p>Tap any card to hear it.</p>
        </header>
        <div className="learning-grid">
          {data.map((item, index) => {
            const label = getLabel(item);
            const word = getWord(item);
            return (
              <button
                className={`learning-card ${active === index ? "learning-card--active" : ""}`}
                key={`${label}-${index}`}
                onClick={() => playSound(item, index)}
                type="button"
                aria-label={`Play ${word || label}`}
              >
                <span className="learning-card__letter">{label}</span>
                {word && <span className="learning-card__word">{word}</span>}
                {item.img && <img src={item.img} alt="" className="learning-card__image" loading="lazy" />}
                <span className="learning-card__sound" aria-hidden="true">{active === index && isPlaying ? "♫" : "🔊"}</span>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
