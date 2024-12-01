import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Formbuilder from "./components/Formbuilder";
import InputBuilder from "./components/InputBuilder";
import Main from "./pages/Main";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/view-form" element={<Formbuilder />} />
        <Route path="/create-form" element={<InputBuilder />} />
      </Routes>
    </Router>
  );
};

export default App;
