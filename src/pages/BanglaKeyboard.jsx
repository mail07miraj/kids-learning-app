import KeyboardLayout from "../components/KeyboardLayout";

const data = [
  // স্বর
  { l: "অ", w: "আম", img: "https://cdn-icons-png.flaticon.com/512/686/686655.png" },
  { l: "আ", w: "আমড়া", img: "https://cdn-icons-png.flaticon.com/512/590/590685.png" },
  { l: "ই", w: "ইদুর", img: "https://cdn-icons-png.flaticon.com/512/1998/1998642.png" },
  { l: "ঈ", w: "ঈগল", img: "https://cdn-icons-png.flaticon.com/512/1998/1998633.png" },
  { l: "উ", w: "উট", img: "https://cdn-icons-png.flaticon.com/512/1998/1998620.png" },
  { l: "ঊ", w: "ঊষা", img: "https://cdn-icons-png.flaticon.com/512/869/869869.png" },
  { l: "এ", w: "এলাচ", img: "https://cdn-icons-png.flaticon.com/512/590/590685.png" },
  { l: "ঐ", w: "ঐরাবত", img: "https://cdn-icons-png.flaticon.com/512/1998/1998627.png" },
  { l: "ও", w: "ওল", img: "https://cdn-icons-png.flaticon.com/512/2909/2909761.png" },
  { l: "ঔ", w: "ঔষধ", img: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png" },

  // ব্যঞ্জন (sample set; বাকি একইভাবে যোগ করবে)
  { l: "ক", w: "কলা", img: "https://cdn-icons-png.flaticon.com/512/2909/2909761.png" },
  { l: "খ", w: "খরগোশ", img: "https://cdn-icons-png.flaticon.com/512/1998/1998642.png" },
  { l: "গ", w: "গাছ", img: "https://cdn-icons-png.flaticon.com/512/427/427735.png" },
  { l: "ঘ", w: "ঘোড়া", img: "https://cdn-icons-png.flaticon.com/512/1998/1998592.png" },
  { l: "চ", w: "চশমা", img: "https://cdn-icons-png.flaticon.com/512/3075/3075967.png" },
  { l: "ছ", w: "ছাতা", img: "https://cdn-icons-png.flaticon.com/512/3075/3075896.png" },
  { l: "জ", w: "জাহাজ", img: "https://cdn-icons-png.flaticon.com/512/3075/3075931.png" },
  { l: "ঝ", w: "ঝুড়ি", img: "https://cdn-icons-png.flaticon.com/512/3075/3075922.png" },
  { l: "ট", w: "টিয়া", img: "https://cdn-icons-png.flaticon.com/512/1998/1998649.png" },
  { l: "ড", w: "ডালিম", img: "https://cdn-icons-png.flaticon.com/512/415/415733.png" }
];

export default function BanglaKeyboard() {
  return (
    <KeyboardLayout
      title="বাংলা বর্ণমালা"
      data={data}
      lang="bn-BD"
      speakText={(i) => `${i.l}, ${i.l} তে ${i.w}`}
    />
  );
}
