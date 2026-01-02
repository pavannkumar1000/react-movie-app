import React from "react";
import "./App.css";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import Favorites from "./Pages/Favorites";
import NavBar from "./components/NavBar";
import { FavoritesProvider } from "./context/FavoritesContext";

export default function App() {
  return (
    <FavoritesProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </FavoritesProvider>
  );
}
