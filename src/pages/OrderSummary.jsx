// order summary page functionality

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../LanguageContext";
import "./OrderSummary.css";

const API_BASE = "http://localhost:3001";

export default function OrderSummary({ cart, clearCart, timeSlot }) {
  const navigate = useNavigate();
  const { t } = useLang();
  const o = t.order;

  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState(null);
  const [confirmed,  setConfirmed]  = useState(false);

  // calculate totals values for the order
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const tax      = subtotal * 0.13; // ontario sales tax
  const total    = subtotal + tax;

  const handleConfirm = async () => {
    setSubmitting(true);
    setError(null);

    // Build the payload – item.id matches the seeded menu_item IDs (1-8)
    const payload = {
      location_id: 1,
      pickup_time: timeSlot,
      items: cart.map((item) => ({
        item_id:    item.id,
        quantity:   1,
        size:       item.size,
        shots:      item.shots,
        milk:       item.milk,
        line_total: item.price,
      })),
    };

    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Server error");
      }

      clearCart();
      setConfirmed(true);
    } catch (err) {
      console.error("Order submission failed:", err);
      setError("Could not save your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
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

          {error && (
            <p style={{ color: "red", fontSize: "0.875rem", marginTop: "0.5rem" }}>
              {error}
            </p>
          )}

          <button
            className="btn-primary order-confirm-btn"
            onClick={handleConfirm}
            disabled={submitting}
          >
            {submitting ? "Placing order…" : o.confirm}
          </button>
        </div>
      </div>

      {/* Confirmation popup for confirming now that we have server */}
      {confirmed && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "white", borderRadius: "12px",
            padding: "2rem", textAlign: "center", maxWidth: "320px", width: "90%"
          }}>
            <p style={{ fontSize: "2rem", margin: "0 0 0.5rem" }}>☕</p>
            <h2 style={{ margin: "0 0 0.5rem" }}>Order Confirmed!</h2>
            <p style={{ margin: "0 0 1.5rem", color: "#666" }}>Thanks!</p>
            <button className="btn-primary" onClick={() => navigate("/")}>OK</button>
          </div>
        </div>
      )}
    </main>
  );
}
