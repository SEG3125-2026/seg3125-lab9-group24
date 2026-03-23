// display the coffee items in a card format, with an image, name, description, price, and a button to customize the order

import "./CoffeeCard.css";


// CoffeeCard component to display a coffee item in a card format
export default function CoffeeCard({ item, onCustomize }) {
  return ( // return the HTML to display it! CSS is ofc from the css file and handled there, functionality is handled by the onCustomize function passed as a prop
    <div className="coffee-card" onClick={() => onCustomize(item)}>
      <div className="coffee-card__img-wrap">
        <img src={item.img} alt={item.name} className="coffee-card__img" />
      </div>
      <div className="coffee-card__body">
        <h3 className="coffee-card__name">{item.name}</h3>
        <p className="coffee-card__desc">{item.desc}</p>
        <div className="coffee-card__footer">
          <span className="coffee-card__price">${item.price.toFixed(2)}</span>
          <button
            className="coffee-card__btn"
            onClick={(e) => { e.stopPropagation(); onCustomize(item); }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
