import LearningGrid from "../components/LearningGrid";
import { bodyParts } from "../data/body";

export default function BodyParts() {
  return <LearningGrid title="🧍 Human Body" data={bodyParts} />;
}
