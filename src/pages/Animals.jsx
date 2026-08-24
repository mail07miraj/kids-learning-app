import LearningGrid from "../components/LearningGrid";
import { animals } from "../data/animals";

export default function Animals() {
  const data = animals.map((item) => ({
    label: "",
    word: item.name,
    img: item.img,
    audio: item.audio,
  }));

  return <LearningGrid title="🐯 Animals, Birds & Vehicles" data={data} />;
}
