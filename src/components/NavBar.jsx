import { Link } from "react-router-dom";
import { useLang } from "../LanguageContext";
import "./NavBar.css";


// return the nav bar, which is just the top menu + checkout button
export default function NavBar({ cartCount }) {
  const { lang, toggle, t } = useLang();

  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">
        <span className="navbar__brand-script">Sick n' Tired</span>
        <span className="navbar__brand-sub">Coffee House</span>
      </Link>

      <div className="navbar__right">
        <button className="navbar__lang-toggle" onClick={toggle} aria-label="Toggle language">
          {lang === "en" ? "FR" : "EN"}
        </button>

        <Link to="/location" className="navbar__cart">
          {cartCount > 0 && (
            <span className="navbar__cart-badge">{cartCount}</span>
          )}
          <span className="navbar__cart-label">{t.nav.checkout}</span>
        </Link>
      </div>
    </header>
  );
}