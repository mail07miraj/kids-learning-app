import KeyboardLayout from "../components/KeyboardLayout";

const data = [
  { l: "ব", w: "বাঘ", img: "https://cdn-icons-png.flaticon.com/512/616/616408.png" },
  { l: "ক", w: "কুকুর", img: "https://cdn-icons-png.flaticon.com/512/616/616430.png" },
  { l: "বি", w: "বিড়াল", img: "https://cdn-icons-png.flaticon.com/512/616/616408.png" },
  { l: "গ", w: "গরু", img: "https://cdn-icons-png.flaticon.com/512/1998/1998611.png" }
];

function BanglaAnimals() {
  return (
    <KeyboardLayout
      data={data}
      lang="bn-BD"
      title="🐯 বাংলা প্রাণী"
      speakText={(item) => `${item.l}, ${item.l} তে ${item.w}`}
    />
  );
}

export default BanglaAnimals;