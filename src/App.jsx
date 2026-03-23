// used to route info between pages / adding to cart global state

import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import LocationPage from "./pages/LocationPage";
import OrderSummary from "./pages/OrderSummary";
import { LanguageProvider } from "./LanguageContext";
import "./App.css";

export default function App() {
  const [cart, setCart] = useState([]);
  const [timeSlot, setTimeSlot] = useState("10:30 AM");

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const clearCart = () => setCart([]);

  return (
    <LanguageProvider>
      <Router>
        <NavBar cartCount={cart.length} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage addToCart={addToCart} />} />
          <Route path="/location" element={<LocationPage cart={cart} setTimeSlot={setTimeSlot} timeSlot={timeSlot} />} />
          <Route path="/order" element={<OrderSummary cart={cart} clearCart={clearCart} timeSlot={timeSlot} />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}
