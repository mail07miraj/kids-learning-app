import KeyboardLayout from "../components/KeyboardLayout";
import { englishWords } from "../data/englishWords";

export default function EnglishWords() {
  return <KeyboardLayout title="🍎 A for Apple" data={englishWords} />;
}
