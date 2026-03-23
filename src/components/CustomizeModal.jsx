// modal component that appears before adding to order
// allows the user to customize the coffee order by selecting size, number of espresso shots, and type of milk

import { useState } from "react";
import { useLang } from "../LanguageContext";
import "./CustomizeModal.css";

// keys for iteration — labels come from translations
const SIZE_KEYS  = ["Small", "Medium", "Large"];
const SHOT_KEYS  = ["Single Shot", "Double Shot", "Triple Shot"];
const MILK_KEYS  = ["Whole Milk", "Oat Milk", "Almond Milk", "Skim Milk", "No Milk"];

const SIZE_PRICES = { Small: 0, Medium: 0.5, Large: 1.0 };

const SIZE_ICONS = { Small: "🥤", Medium: "☕", Large: "🧋" };

// default options selected for the card
export default function CustomizeModal({ item, onClose, onAdd }) {
  const [size,  setSize]  = useState("Small");
  const [shots, setShots] = useState("Single Shot");
  const [milk,  setMilk]  = useState("Whole Milk");

  const { t } = useLang();
  const m = t.modal;

  if (!item) return null; // if we don't have an item, we don't want to show the modal

  const total = (item.price + SIZE_PRICES[size]).toFixed(2);

  // add an item to the order with the selected customizations and close the modal
  const handleAdd = () => {
    // Store translated labels for the order summary display
    onAdd({
      ...item,
      size:  m.sizes[size],
      shots: m.shots[shots],
      milk:  m.milks[milk],
      price: parseFloat(total),
    });
    onClose();
  };

  // return the modal with the customization options
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>✕</button>

        {/* header with the image, name, and description of the item */}
        <div className="modal__header">
          <img src={item.img} alt={item.name} className="modal__img" />
          <div>
            <h2 className="modal__title">{item.name}</h2>
            <p className="modal__desc">{item.desc}</p>
          </div>
        </div>

        {/* size */}
        <div className="modal__section">
          <label className="modal__label">{m.sizeLabel}</label>
          <div className="modal__size-btns">
            {SIZE_KEYS.map((s) => (
              <button
                key={s}
                className={`size-btn ${size === s ? "active" : ""}`}
                onClick={() => setSize(s)}
              >
                <span className="size-btn__icon">{SIZE_ICONS[s]}</span>
                <span>{m.sizes[s]}</span>
                {s !== "Small" && (
                  <span className="size-btn__price">+${SIZE_PRICES[s].toFixed(2)}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* espresso shots */}
        <div className="modal__section">
          <label className="modal__label">{m.shotsLabel}</label>
          <select
            className="modal__select"
            value={shots}
            onChange={(e) => setShots(e.target.value)}
          >
            {SHOT_KEYS.map((s) => (
              <option key={s} value={s}>{m.shots[s]}</option>
            ))}
          </select>
        </div>

        {/* milk */}
        <div className="modal__section">
          <label className="modal__label">{m.milkLabel}</label>
          <select
            className="modal__select"
            value={milk}
            onChange={(e) => setMilk(e.target.value)}
          >
            {MILK_KEYS.map((mk) => (
              <option key={mk} value={mk}>{m.milks[mk]}</option>
            ))}
          </select>
        </div>

        {/* add to order button with the total price */}
        <button className="modal__add btn-primary" onClick={handleAdd}>
          {m.addBtn(total)}
        </button>
      </div>
    </div>
  );
}
