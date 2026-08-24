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

export default function KeyboardLayout({ data = [], title }) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);
  const playIdRef = useRef(0);
  const item = data[index];

  const stopSound = useCallback(() => {
    playIdRef.current += 1;
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
    audioRef.current = null;
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
  }, []);

  useEffect(() => () => stopSound(), [stopSound]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.muted = isMuted;
    }
  }, [isMuted, volume]);

  const speakFallback = useCallback((lessonItem, playId) => {
    if (isMuted || !window.speechSynthesis) {
      setIsPlaying(false);
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(getSpokenText(lessonItem));
      utterance.lang = "en-US";
      utterance.rate = 0.84;
      utterance.pitch = 1.12;
      utterance.volume = volume;
      utterance.onend = () => {
        if (playIdRef.current === playId) setIsPlaying(false);
        resolve();
      };
      utterance.onerror = () => {
        if (playIdRef.current === playId) setIsPlaying(false);
        resolve();
      };
      window.speechSynthesis.speak(utterance);
    });
  }, [isMuted, volume]);

  const playItem = useCallback(async (lessonItem) => {
    if (!lessonItem) return;
    stopSound();
    const playId = playIdRef.current;
    setIsPlaying(true);

    if (!lessonItem.audio) {
      await speakFallback(lessonItem, playId);
      return;
    }

    const audio = new Audio(lessonItem.audio);
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
          setIsPlaying(false);
        }
        resolve();
      };
      const fallback = async () => {
        if (settled) return;
        settled = true;
        audio.pause();
        audioRef.current = null;
        await speakFallback(lessonItem, playId);
        resolve();
      };
      audio.onended = finish;
      audio.onerror = fallback;
      const playPromise = audio.play();
      if (playPromise) playPromise.catch(fallback);
    });
  }, [isMuted, speakFallback, stopSound, volume]);

  const playCurrent = useCallback(() => {
    void playItem(item);
  }, [item, playItem]);

  const goTo = useCallback((nextIndex) => {
    setIndex(nextIndex);
    void playItem(data[nextIndex]);
  }, [data, playItem]);

  const next = useCallback(() => {
    if (!data.length) return;
    goTo((index + 1) % data.length);
  }, [data.length, goTo, index]);

  const prev = useCallback(() => {
    if (!data.length) return;
    goTo(index === 0 ? data.length - 1 : index - 1);
  }, [data.length, goTo, index]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
      if (event.key === " " || event.key === "Enter") {
        if (event.target === document.body) {
          event.preventDefault();
          playCurrent();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, playCurrent, prev]);

  if (!item) return null;

  const label = getLabel(item);
  const word = getWord(item);

  return (
    <main className="lesson-shell lesson-shell--single-card">
      <div className="lesson-background-shape lesson-background-shape--one" aria-hidden="true" />
      <div className="lesson-background-shape lesson-background-shape--two" aria-hidden="true" />
      <div className="lesson-content lesson-content--single-card">
        <ControlBar
          onPlay={playCurrent}
          onStop={stopSound}
          isPlaying={isPlaying}
          isMuted={isMuted}
          volume={volume}
          onToggleMute={() => setIsMuted((muted) => !muted)}
          onVolumeChange={setVolume}
        />

        <header className="lesson-heading lesson-heading--compact">
          <span className="lesson-heading__sparkle" aria-hidden="true">✦</span>
          <h1>{title}</h1>
          <p>Card {index + 1} of {data.length} · tap the picture or Play sound</p>
        </header>

        <section className="single-card" aria-live="polite">
          <div className="single-card__copy">
            <span className="single-card__eyebrow">Say it with me</span>
            <button className="single-card__letter" onClick={playCurrent} type="button" aria-label={`Hear ${label} ${word}`}>
              {label}
            </button>
            <h2>{word}</h2>
            <button className="single-card__listen" onClick={playCurrent} type="button">
              <span aria-hidden="true">{isPlaying ? "♫" : "🔊"}</span>
              {isPlaying ? "Listening…" : "Hear this card"}
            </button>
          </div>
          <button className="single-card__art" onClick={playCurrent} type="button" aria-label={`Hear ${word}`}>
            {item.img ? (
              <img src={item.img} alt={word} onError={(event) => { event.currentTarget.style.display = "none"; }} />
            ) : (
              <span aria-hidden="true">✨</span>
            )}
          </button>
        </section>

        <div className="lesson-navigation">
          <button className="lesson-nav-button" onClick={prev} type="button" aria-label="Previous card">
            <span aria-hidden="true">←</span> Previous
          </button>
          <div className="lesson-dots" aria-label={`Card ${index + 1} of ${data.length}`}>
            {data.map((entry, dotIndex) => (
              <span className={dotIndex === index ? "lesson-dot lesson-dot--active" : "lesson-dot"} key={`${getLabel(entry)}-${dotIndex}`} />
            ))}
          </div>
          <button className="lesson-nav-button lesson-nav-button--next" onClick={next} type="button" aria-label="Next card">
            Next <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </main>
  );
}
