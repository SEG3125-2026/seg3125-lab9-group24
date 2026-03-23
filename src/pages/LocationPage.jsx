// functionality to select pick up time and location for the order

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../LanguageContext";
import "./LocationPage.css";


// info about locations
const LOCATIONS = [
  {
    id: 1,
    nameKey: "mainBranch",
    address: "124 Crashingout Street, Any City, ON",
    phone: "(613) 111-6767",
    weekdays: "8am – 5pm",
    weekends: "9am – 4pm",
    img: "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg",
  },
  {
    id: 2,
    nameKey: "secondLocation",
    address: "124 Crashingout Street, Any City, ON",
    phone: "(613) 111-4999",
    weekdays: "8am – 5pm",
    weekends: "9am – 4pm",
    img: "https://images.pexels.com/photos/702251/pexels-photo-702251.jpeg",
  },
];

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM",  "1:30 PM",  "2:00 PM",  "2:30 PM",
];


// return the location page, handle the button presses
export default function LocationPage({ cart, setTimeSlot, timeSlot }) {
  const [selected, setSelected] = useState(null);
  const [selectedTime, setSelectedTime] = useState(timeSlot);
  const navigate = useNavigate();
  const { t } = useLang();
  const l = t.location;

  // used to select a time slot, updates the state and the parent component's time slot so it shows up in the order summary
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setTimeSlot(time);
  };

  const handleContinue = () => {
    if (!selected) return;
    navigate("/order");
  };

  // first select a location, then time, then confirm order
  return (
    <main className="location-page page-enter">
      <div className="section">
        <h1 className="location-page__heading">{l.heading}</h1>
        <p className="location-page__sub">{l.subheading}</p>

        <div className="location-page__grid">
          {LOCATIONS.map((loc) => (
            <div
              key={loc.id}
              className={`loc-card ${selected === loc.id ? "active" : ""}`}
              onClick={() => setSelected(loc.id)}
            >
              <div className="loc-card__img-wrap">
                <img src={loc.img} alt={l[loc.nameKey]} className="loc-card__img" />
                {selected === loc.id && (
                  <div className="loc-card__check">✓</div>
                )}
              </div>
              <div className="loc-card__body">
                <h3 className="loc-card__name">{l[loc.nameKey]}</h3>
                <p className="loc-card__address">{loc.address}</p>
                <p className="loc-card__hours">{l.weekdays}: {loc.weekdays}</p>
                <p className="loc-card__hours">{l.weekends}: {loc.weekends}</p>
                <p className="loc-card__phone">{loc.phone}</p>
              </div>
            </div>
          ))}
        </div>

        {/* time slot selection */}
        {selected && (
          <div className="time-picker">
            <h2 className="time-picker__heading">{l.timeHeading}</h2>
            <div className="time-picker__grid">
              {TIME_SLOTS.map((time) => (
                <button
                  key={time}
                  className={`time-btn ${selectedTime === time ? "active" : ""}`}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="location-page__actions">
          <button
            className="btn-primary"
            disabled={!selected}
            onClick={handleContinue}
          >
            {l.continue}
          </button>
          {!selected && (
            <p className="location-page__hint">{l.hint}</p>
          )}
        </div>
      </div>
    </main>
  );
}
