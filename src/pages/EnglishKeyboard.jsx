import KeyboardLayout from "../components/KeyboardLayout";

const data = [
  { l: "A", w: "Apple", img: "https://image2url.com/r2/default/images/1769805485053-3b85a7e5-7f39-45f7-bb73-3204790bba69.png" },
  { l: "B", w: "Ball", img: "https://cdn-icons-png.flaticon.com/512/861/861512.png" },
  { l: "C", w: "Cat", img: "https://image2url.com/r2/default/images/1769805833880-52e5c73b-7a31-4556-972a-a845c83df071.png" },
  { l: "D", w: "Dog", img: "https://image2url.com/r2/default/images/1769806274248-85d81df5-3c88-4077-bb92-f1614ec8f57c.png" },
  { l: "E", w: "Elephant", img: "https://image2url.com/r2/default/images/1769884491594-2a7f259a-3d3a-41c9-b09f-697373030a15.png" },
  { l: "F", w: "Fish", img: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmdpcWVqaXQ2dGhjNDA0bHo4NDh4dmlkcW5paGo0czY4NzU1MTdxcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RfrKi9XerWkhL3PkEh/giphy.gif" },
  { l: "G", w: "Giraffe", img: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3IzcGszN3NudHBsbW14aGxkMTZlZWxpZ3UwMnJrOGlnejd1cmJmbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT9IgK64Gno0fl356w/giphy.gif" },
  { l: "H", w: "Hen", img: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYW5ubXI3cnhiczdhcWJidjZyMmpobjFkdXdsbDVqMTBvNWl3NjkydyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3vR9IEU6nYAmZyoM/giphy.gif" },
  { l: "I", w: "Ice Cream", img: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzJvZGVnYnljbW96d2RuNm4wbDAycXM2NzhteWVwYWFlcmc1bnllNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GrcOwUfvCnhmqYRIwu/giphy.gif" },
  { l: "J", w: "Juice", img: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWNhNHpnMW9nZ3IwOWFoY3VsYjMyaGc1Y2JtZmdoa3g2ejRpNjJlayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6Ou6v3qsIwzJ7mDdmY/giphy.gif" },
  { l: "K", w: "Kangaroo", img: "https://image2url.com/r2/default/images/1769888091789-1802897a-09f3-4e8f-904e-1b753338a78a.blob" },
  { l: "L", w: "Lion", img: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXV4bWU2a3N4cWlscmtyZWQxM3gyaWN6bmQwdThrY2Jib2NuNDlqdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yIe7oBlW62Bzy/giphy.gif" },
  { l: "M", w: "Mango", img: "https://image2url.com/r2/default/images/1769888371780-95ae1060-a0d9-41a2-810f-c1fbf1512e0b.png" },
  { l: "N", w: "Net", img: "https://image2url.com/r2/default/images/1769889312026-0b196874-1d83-4790-acf0-6526d2116a7d.png" },
  { l: "O", w: "Orange", img: "https://image2url.com/r2/default/images/1769889503199-09728987-18e2-487f-a7a1-70302b6d4172.png" },
  { l: "P", w: "Pizza", img: "https://image2url.com/r2/default/images/1770404086454-10919748-cc4d-462f-bb76-b9852a18703e.png" },
  { l: "Q", w: "Queen", img: "https://image2url.com/r2/default/images/1770404343834-9102817f-7236-497d-8e73-f991c82a4b92.jpg" },
  { l: "R", w: "Rabbit", img: "https://image2url.com/r2/default/images/1770404472771-aa2808de-ef4e-4bcf-b65e-8805a7d29eb9.png" },
  { l: "S", w: "Sun", img: "https://cdn-icons-png.flaticon.com/512/869/869869.png" },
  { l: "T", w: "Tiger", img: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3VwY2VuMTNiaTk3NHk3MHUxODlyNWFxM2Zzc2tvcjhhaWIxeGFwdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/oj3ikZnoJBp2Oq7yBX/giphy.gif" },
  { l: "U", w: "Umbrella", img: "https://image2url.com/r2/default/images/1770404877133-32bed5b4-9c38-41f5-a4ac-8fc53f7755a9.png" },
  { l: "V", w: "Violin", img: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTN6Y3d2MTdhOWhjd3J1bWg3MzZzdG1jNmd2NDNtZXA5b2p1ZjEwMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KbTNbjRki4W8sAORJ8/giphy.gif" },
  { l: "W", w: "Watch", img: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTVub3d2Nm52cXBwczM1b3B5cHkyaDRnemRodGl3M3dmMDRmbjRyZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eKggqtzMsD9OW5HPzV/giphy.gif" },
  { l: "X", w: "Xylophone", img: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXNudGdmNDJnNTd4eWZ6eHIzYmZmY2s4M2t0cHJrdWVxbWtwdGwycyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/m8yGXrU8Mdb2fwpDwF/giphy.gif" },
  { l: "Y", w: "YoYo", img: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDlnZmRwbnlpbGpydG52Ynkwc2phYnR4ZWlscm1mY2d6YzU3bGZ6ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT8qBcsHNO3ulvMuUE/giphy.gif" },
  { l: "Z", w: "Zebra", img: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExd294OG12dDZyYmMwZm9hZ2I3cG1xZHB1Znh3MDA2eDAyMGRkdmRteCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FA7Ao05T81V9m/giphy.gif" }
];

export default function EnglishKeyboard() {
  return (
    <KeyboardLayout
      title="English Alphabet"
      data={data}
      lang="en-US"
      speakText={(i) => `${i.l} for ${i.w}`}
    />
  );
}
