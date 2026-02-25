import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";
import App from "./App";

const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log("New version available, reloading...");
    updateSW(true);   // 🔥 force update
  },
  onOfflineReady() {
    console.log("App ready offline");
  }
});

// 🔥 extra safety: reload when controller changes
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    window.location.reload();
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);