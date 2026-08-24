import { Route, Routes, useNavigate } from "react-router-dom";
import EnglishAlphabet from "./pages/EnglishAlphabet";
import BanglaSwaroborno from "./pages/BanglaSwaroborno";
import BanglaByanjan from "./pages/BanglaByanjan";
import BanglaNumbers from "./pages/BanglaNumbers";
import BanglaRhymes from "./pages/BanglaRhymes";
import Animals from "./pages/Animals";
import Fruits from "./pages/Fruits";
import BodyParts from "./pages/BodyParts";
import ArabicLetters from "./pages/ArabicLetters";
import EnglishWords from "./pages/EnglishWords";
import BanglaWords from "./pages/BanglaWords";
import "./App.css";

const sections = [
  {
    title: "Language learning",
    icon: "📚",
    cards: [
      { icon: "🔤", label: "ABC Keyboard", description: "Meet the English letters", path: "/english-alphabet", tone: "blue" },
      { icon: "অ", label: "স্বরবর্ণ", description: "Learn Bangla vowels", path: "/bangla-swaroborno", tone: "pink" },
      { icon: "ক", label: "ব্যঞ্জনবর্ণ", description: "Explore Bangla consonants", path: "/bangla-byanjan", tone: "purple" },
      { icon: "১২৩", label: "বাংলা সংখ্যা", description: "Count from one to ten", path: "/bangla-numbers", tone: "green" },
      { icon: "ا", label: "আরবি বর্ণমালা", description: "Discover Arabic letters", path: "/arabic", tone: "orange" },
      { icon: "🍎", label: "A for Apple", description: "One word at a time", path: "/english-words", tone: "red", featured: true },
      { icon: "অ", label: "অ for অজগর", description: "Bangla words with pictures", path: "/bangla-words", tone: "yellow" },
    ],
  },
  {
    title: "Rhymes & recitation",
    icon: "🎵",
    cards: [
      { icon: "📖", label: "বাংলা ছড়া", description: "Listen and recite together", path: "/bangla-rhymes", tone: "pink" },
      { icon: "🎶", label: "English Rhymes", description: "Coming soon", tone: "blue", disabled: true },
      { icon: "🎼", label: "গজল", description: "Coming soon", tone: "purple", disabled: true },
    ],
  },
  {
    title: "General knowledge",
    icon: "🌍",
    cards: [
      { icon: "🥦", label: "Fruits & flowers", description: "Name the colorful world", path: "/fruits", tone: "green" },
      { icon: "🐯", label: "Animals & vehicles", description: "Meet, move and explore", path: "/animals", tone: "orange" },
      { icon: "🧍", label: "Human body", description: "Learn about yourself", path: "/body", tone: "red" },
    ],
  },
];

function LearningCard({ card, onClick }) {
  return (
    <button
      className={`home-card home-card--${card.tone} ${card.featured ? "home-card--featured" : ""}`}
      onClick={onClick}
      disabled={card.disabled}
      type="button"
    >
      <span className="home-card__icon" aria-hidden="true">{card.icon}</span>
      <span className="home-card__copy">
        <strong>{card.label}</strong>
        <small>{card.description}</small>
      </span>
      <span className="home-card__arrow" aria-hidden="true">{card.disabled ? "Soon" : "→"}</span>
    </button>
  );
}

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home-shell">
      <div className="home-orb home-orb--one" aria-hidden="true" />
      <div className="home-orb home-orb--two" aria-hidden="true" />

      <header className="home-hero">
        <div className="home-hero__badge"><span>✦</span> Learn, play, grow <span>✦</span></div>
        <h1>Little Learners</h1>
        <p>Big discoveries for curious little minds.</p>
        <div className="home-hero__stars" aria-hidden="true">★  ★  ★</div>
      </header>

      <div className="home-content">
        {sections.map((section) => (
          <section className="home-section" key={section.title}>
            <div className="section-heading">
              <span className="section-heading__icon" aria-hidden="true">{section.icon}</span>
              <div>
                <h2>{section.title}</h2>
                <p>Tap a card to start learning</p>
              </div>
            </div>
            <div className="home-grid">
              {section.cards.map((card) => (
                <LearningCard key={card.label} card={card} onClick={() => card.path && navigate(card.path)} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="home-footer">Every tap is a little win <span aria-hidden="true">♥</span></footer>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bangla-swaroborno" element={<BanglaSwaroborno />} />
      <Route path="/bangla-byanjan" element={<BanglaByanjan />} />
      <Route path="/bangla-numbers" element={<BanglaNumbers />} />
      <Route path="/bangla-rhymes" element={<BanglaRhymes />} />
      <Route path="/animals" element={<Animals />} />
      <Route path="/fruits" element={<Fruits />} />
      <Route path="/body" element={<BodyParts />} />
      <Route path="/arabic" element={<ArabicLetters />} />
      <Route path="/english-alphabet" element={<EnglishAlphabet />} />
      <Route path="/english-words" element={<EnglishWords />} />
      <Route path="/bangla-words" element={<BanglaWords />} />
    </Routes>
  );
}
