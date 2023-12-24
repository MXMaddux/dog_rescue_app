import logo from "./logo.svg";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

import Hero from "./components/Hero";

function App() {
  return (
    <Router>
      <Hero />
    </Router>
  );
}

export default App;
