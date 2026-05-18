import LearningGrid from "../components/LearningGrid";
import { englishWords } from "../data/englishWords";

const EnglishWords = () => {
  return (
    <LearningGrid
      title="🍎 A for Apple"
      data={englishWords}
    />
  );
};

export default EnglishWords; // এই লাইনটি নিশ্চিত করুন একদম শেষে আছে
