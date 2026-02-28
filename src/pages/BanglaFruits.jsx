import KeyboardLayout from "../components/KeyboardLayout";

const data = [
  { l: "ক", w: "কলা", img: "https://cdn-icons-png.flaticon.com/512/590/590685.png" },
  { l: "আ", w: "আম", img: "https://cdn-icons-png.flaticon.com/512/590/590695.png" },
  { l: "ল", w: "লিচু", img: "https://cdn-icons-png.flaticon.com/512/590/590702.png" },
  { l: "ক", w: "কাঁঠাল", img: "https://cdn-icons-png.flaticon.com/512/590/590707.png" }
];

export default function BanglaFruits() {
  return (
    <KeyboardLayout
      data={data}
      lang="bn-BD"
      title="🍌 বাংলা ফল"
      speakText={(item) => `${item.l}, ${item.l} তে ${item.w}`}
    />
  );
}
