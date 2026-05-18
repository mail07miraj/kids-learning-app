import LearningGrid from "../components/LearningGrid";
import { banglaWords } from "../data/banglaWords";

export default function BanglaWords() {
  return (
    <LearningGrid
      title="🍎 অ for অজগর"
      data={banglaWords}
    />
  );
}