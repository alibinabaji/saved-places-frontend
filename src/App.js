import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { BrowserRouter } from "react-router-dom";
import AddListForm from "./components/AddListForm";
import AddLocMap from "./components/AddLocMap";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addList" element={<AddListForm />} />
        <Route path="/addLocMap/:listId" element={<AddLocMap />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
