// home page with locations and header and footer sections
// links to the ordering section etc

import { Link } from "react-router-dom";
import { useLang } from "../LanguageContext";
import "./HomePage.css";


// info about each location
const LOCATIONS = [
  {
    id: 1,
    nameKey: "mainBranch",
    address: "124 Crashingout Street",
    weekdays: "8am – 5pm",
    weekends: "9am – 4pm",
    phone: "613-111-6767",
    img: "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg",
  },
  {
    id: 2,
    nameKey: "secondLocation",
    address: "124 Crashingout Street",
    weekdays: "8am – 5pm",
    weekends: "9am – 4pm",
    phone: "613-111-4999",
    img: "https://images.pexels.com/photos/702251/pexels-photo-702251.jpeg",
  },
];


// return all the cards for the home page, hero section, locations section and contact footer
export default function HomePage() {
  const { t } = useLang();
  const h = t.home;

  return (
    <main className="home page-enter">
      {/* hero section */}
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">{h.welcome}</p>
          <h1 className="hero__title">
            Sick n' Tired<br />
            <span className="hero__title-sub">Coffee House</span>
          </h1>
          <p className="hero__tagline">
            {h.tagline.split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </p>
          <div className="hero__actions">
            <Link to="/menu" className="btn-primary">{h.orderNow}</Link>
            <a href="#locations" className="btn-outline">{h.ourLocations}</a>
          </div>
        </div>
        <div className="hero__illustration">
          <div className="hero__circle" />
          <img
            src="https://images.pexels.com/photos/2130141/pexels-photo-2130141.jpeg"
            alt="Coffee"
            className="hero__img"
          />
        </div>
      </section>

      {/* locations */}
      <section className="locations section" id="locations">
        <h2 className="locations__heading">{h.locationsTitle}</h2>
        <div className="locations__grid">
          {LOCATIONS.map((loc) => (
            <div className="location-card" key={loc.id}>
              <div className="location-card__img-wrap">
                <img src={loc.img} alt={h[loc.nameKey]} className="location-card__img" />
                <span className="location-card__badge">{h[loc.nameKey]}</span>
              </div>
              <div className="location-card__body">
                <h3 className="location-card__name">{loc.address}</h3>
                <p className="location-card__hours">
                  <span>{h.weekdays}:</span> {loc.weekdays}
                </p>
                <p className="location-card__hours">
                  <span>{h.weekends}:</span> {loc.weekends}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* contact footer */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <p className="footer__brand-script">Sick n' Tired</p>
            <p className="footer__brand-sub">Coffee House</p>
          </div>
          <div className="footer__contact">
            <div>
              <p className="footer__label">{h.callUs}</p>
              <p>{h.mainBranch}: <strong>613-111-6767</strong></p>
              <p>{h.secondLocation}: <strong>613-111-4999</strong></p>
            </div>
            <div>
              <p className="footer__label">{h.emailUs}</p>
              <p>sickntired@email.com</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
