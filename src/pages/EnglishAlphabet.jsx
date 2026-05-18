import LearningGrid from "../components/LearningGrid";
import { englishAlphabet } from "../data/englishAlphabet";

export default function EnglishAlphabet(){

return(

<LearningGrid
title="🔤 English Alphabet"
data={englishAlphabet}
/>

);

}