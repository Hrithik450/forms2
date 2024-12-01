import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Formbuilder from "./components/Formbuilder";
import Home from "./pages/home";
import InputBuilder from "./components/InputBuilder";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view-form" element={<Formbuilder />} />
        <Route path="/create-form" element={<InputBuilder />} />
      </Routes>
    </Router>
  );
};

export default App;
