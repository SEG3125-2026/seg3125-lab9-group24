// menu page functionality, shows the items and has the add button

import { useState } from "react";
import CoffeeCard from "../components/CoffeeCard";
import CustomizeModal from "../components/CustomizeModal";
import { useNavigate } from "react-router-dom";
import { useLang } from "../LanguageContext";
import "./MenuPage.css";

const HOT_COFFEES = [
  { id: 1, nameKey: "espresso",        descKey: "espresso",        price: 3.25, img: "https://images.pexels.com/photos/4862099/pexels-photo-4862099.jpeg" },
  { id: 2, nameKey: "cappuccino",      descKey: "cappuccino",      price: 4.75, img: "https://images.pexels.com/photos/247683/pexels-photo-247683.jpeg" },
  { id: 3, nameKey: "flatWhite",       descKey: "flatWhite",       price: 4.50, img: "https://images.pexels.com/photos/5337017/pexels-photo-5337017.jpeg" },
  { id: 4, nameKey: "caramelLatte",    descKey: "caramelLatte",    price: 5.25, img: "https://images.pexels.com/photos/5567613/pexels-photo-5567613.jpeg" },
];

const ICED_COFFEES = [
  { id: 5, nameKey: "icedAmericano",    descKey: "icedAmericano",    price: 4.00, img: "https://images.pexels.com/photos/5527544/pexels-photo-5527544.jpeg" },
  { id: 6, nameKey: "coldBrew",         descKey: "coldBrew",         price: 4.75, img: "https://images.pexels.com/photos/6328975/pexels-photo-6328975.jpeg" },
  { id: 7, nameKey: "icedVanillaLatte", descKey: "icedVanillaLatte", price: 5.50, img: "https://images.pexels.com/photos/36572437/pexels-photo-36572437.jpeg" },
  { id: 8, nameKey: "icedMatchaLatte",  descKey: "icedMatchaLatte",  price: 5.75, img: "https://images.pexels.com/photos/36210921/pexels-photo-36210921.jpeg" },
];

const TABS = ["Food", "Baked Goods", "Coffee", "Specialty Drinks"];


// this is just all the coffeecards displayed, customize modal is called when pressing the +
export default function MenuPage({ addToCart }) {
  const [activeTab,    setActiveTab]    = useState("Coffee");
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartCount,    setCartCount]    = useState(0);
  const navigate = useNavigate();
  const { t } = useLang();
  const m = t.menu;

  const handleAdd = (item) => {
    addToCart(item);
    setCartCount((c) => c + 1);
  };

  // Inject translated name and desc into item before passing down
  const withDesc = (item) => ({
    ...item,
    name: t.coffeeNames[item.nameKey],
    desc: t.coffeeDesc[item.descKey],
  });

  return (
    <main className="menu-page page-enter">
      {/* tabs */}
      <div className="menu-tabs">
        {TABS.map((tabKey) => (
          <button
            key={tabKey}
            className={`menu-tab ${activeTab === tabKey ? "active" : ""}`}
            onClick={() => setActiveTab(tabKey)}
          >
            {m.tabs[tabKey]}
          </button>
        ))}
      </div>

      <div className="section">
        {activeTab === "Coffee" ? (
          <>
            {/* hot Coffee section */}
            <section className="menu-section">
              <div className="menu-section__header">
                <h2 className="menu-section__title">{m.hotCoffee}</h2>
                <div className="menu-section__line" />
              </div>
              <div className="menu-grid">
                {HOT_COFFEES.map((item) => (
                  <CoffeeCard key={item.id} item={withDesc(item)} onCustomize={setSelectedItem} />
                ))}
              </div>
            </section>

            {/* iced Coffee section */}
            <section className="menu-section">
              <div className="menu-section__header">
                <h2 className="menu-section__title">{m.icedCoffee}</h2>
                <div className="menu-section__line" />
              </div>
              <div className="menu-grid">
                {ICED_COFFEES.map((item) => (
                  <CoffeeCard key={item.id} item={withDesc(item)} onCustomize={setSelectedItem} />
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className="menu-empty">
            <p>{m.comingSoon}</p>
          </div>
        )}
      </div>

      {/* checkout button */}
      {cartCount > 0 && (
        <div className="menu-checkout-bar">
          <span>{m.itemsInCart(cartCount)}</span>
          <button className="btn-primary" onClick={() => navigate("/location")}>
            {m.checkout}
          </button>
        </div>
      )}

      {/* call the customize modal */}
      <CustomizeModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAdd={handleAdd}
      />
    </main>
  );
}
