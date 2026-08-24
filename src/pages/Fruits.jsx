import LearningGrid from "../components/LearningGrid";
import { fruits } from "../data/fruits";

export default function Fruits() {
  const data = fruits.map((item) => ({
    label: item.label ?? "",
    word: item.word ?? item.name,
    img: item.img,
    audio: item.audio,
  }));

  return <LearningGrid title="🥦 Vegetables, Fruits & Flowers" data={data} />;
}
