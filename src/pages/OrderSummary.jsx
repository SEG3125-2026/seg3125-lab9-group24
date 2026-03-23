// order summary page functionality

import { useNavigate } from "react-router-dom";
import { useLang } from "../LanguageContext";
import "./OrderSummary.css";

export default function OrderSummary({ cart, clearCart, timeSlot }) {
  const navigate = useNavigate();
  const { t } = useLang();
  const o = t.order;

  // calculate totals values for the order
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const tax      = subtotal * 0.13; // ontario sales tax
  const total    = subtotal + tax;

  const handleConfirm = () => {
    clearCart();
    navigate("/");
  };

  if (cart.length === 0) {
    return (
      <main className="order-page page-enter">
        <div className="section order-empty">
          <p className="order-empty__icon">☕</p>
          <h2>{o.emptyTitle}</h2>
          <p>{o.emptyMsg}</p>
          <button className="btn-primary" onClick={() => navigate("/menu")}>
            {o.browseMenu}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="order-page page-enter">
      <div className="section order-layout">
        {/* Left: title + image */}
        <div className="order-hero">
          <h1 className="order-hero__title">
            {o.title.split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h1>
          <div className="order-hero__img-wrap">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80"
              alt="Coffee"
              className="order-hero__img"
            />
          </div>
        </div>

        {/* Right: summary card */}
        <div className="order-card">
          {/* Location & Time */}
          <div className="order-card__section">
            <p className="order-card__label">{o.pickupLabel}</p>
            <p className="order-card__value">123 Fillerspace St. Any City, ON</p>
            <p className="order-card__value">(123) 456-7890</p>
            <p className="order-card__value order-card__time">{timeSlot}</p>
          </div>

          <div className="order-card__divider" />

          {/* Items */}
          <div className="order-card__section">
            <p className="order-card__label">{o.summaryLabel}</p>
            <ul className="order-items">
              {cart.map((item, idx) => (
                <li key={idx} className="order-item">
                  <div className="order-item__info">
                    <span className="order-item__name">{item.name}</span>
                    <span className="order-item__details">
                      {item.size} · {item.shots} · {item.milk}
                    </span>
                  </div>
                  <span className="order-item__price">${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-card__divider" />

          {/* Totals */}
          <div className="order-card__section">
            <div className="order-total-row">
              <span>{o.subtotal}</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="order-total-row">
              <span>{o.tax}</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="order-total-row order-total-row--total">
              <span>{o.total}</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button className="btn-primary order-confirm-btn" onClick={handleConfirm}>
            {o.confirm}
          </button>
        </div>
      </div>
    </main>
  );
}
