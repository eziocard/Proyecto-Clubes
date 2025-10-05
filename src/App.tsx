import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Auth from "./pages/Auth";

function App() {
  return (
    <>
      <div id="auth-container">
        <Auth />
      </div>
    </>
  );
}

export default App;
