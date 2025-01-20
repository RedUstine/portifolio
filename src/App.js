import React from "react";
import { Header } from "./Components/Header/Header";
import "./App.css";
import { Skills } from "./Components/Skills/Skills";
import { Project } from "./Components/Project/Project";
import { About } from "./Components/About/About";
import { Contact } from "./Components/Contact/Contact";
import { Footer } from "./Components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Skills />
      <Project />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
