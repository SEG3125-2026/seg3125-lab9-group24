import { createContext, useContext, useState } from "react";

const translations = {
  en: {
    // NavBar
    nav: {
      checkout: "Checkout",
    },

    // HomePage
    home: {
      welcome:        "Welcome to",
      tagline:        "Overworked and under-caffeinated?\nWe've bean there.",
      orderNow:       "Order Now",
      ourLocations:   "Our Locations",
      locationsTitle: "Our Locations",
      weekdays:       "Weekdays",
      weekends:       "Weekends",
      callUs:         "Call Us",
      emailUs:        "Email Us",
      mainBranch:     "Main Branch",
      secondLocation: "2nd Location",
    },

    // MenuPage
    menu: {
      tabs: {
        Food:            "Food",
        "Baked Goods":   "Baked Goods",
        Coffee:          "Coffee",
        "Specialty Drinks": "Specialty Drinks",
      },
      hotCoffee:    "Hot Coffee",
      icedCoffee:   "Iced Coffee",
      comingSoon:   "This section is coming soon!",
      itemsInCart:  (n) => `${n} item${n > 1 ? "s" : ""} in cart`,
      checkout:     "Checkout →",
    },

    // Coffee item names
    coffeeNames: {
      espresso:        "Classic Espresso",
      cappuccino:      "Cappuccino",
      flatWhite:       "Flat White",
      caramelLatte:    "Caramel Latte",
      icedAmericano:   "Iced Americano",
      coldBrew:        "Cold Brew",
      icedVanillaLatte:"Iced Vanilla Latte",
      icedMatchaLatte: "Iced Matcha Latte",
    },

    // Coffee item descriptions
    coffeeDesc: {
      espresso:        "Try our classic espresso!",
      cappuccino:      "Try our cappuccino!",
      flatWhite:       "Try our flat white!",
      caramelLatte:    "Try our caramel latte!",
      icedAmericano:   "Try our iced americano!",
      coldBrew:        "Try our cold brew!",
      icedVanillaLatte:"Try our iced vanilla latte!",
      icedMatchaLatte: "Try our iced matcha latte!",
    },

    // LocationPage
    location: {
      heading:        "Select a Pick-up Location",
      subheading:     "Choose where you'd like to collect your order.",
      weekdays:       "Weekdays",
      weekends:       "Weekends",
      timeHeading:    "Select a Pick-up Time",
      continue:       "Continue to Order Summary →",
      hint:           "Please select a location to continue.",
      mainBranch:     "Main Branch",
      secondLocation: "2nd Location",
    },

    // OrderSummary
    order: {
      emptyTitle:    "Your cart is empty",
      emptyMsg:      "Head to the menu and add some items!",
      browseMenu:    "Browse Menu",
      title:         "Order\nSummary",
      pickupLabel:   "Pick-up Location & Time",
      summaryLabel:  "Order Summary",
      subtotal:      "Subtotal",
      tax:           "Tax (13%)",
      total:         "Total",
      confirm:       "Confirm Order ✓",
    },

    // CustomizeModal
    modal: {
      sizeLabel:   "Size Option",
      shotsLabel:  "Espresso Shots",
      milkLabel:   "Milk",
      addBtn:      (total) => `Add to Order — $${total}`,
      sizes:  { Small: "Small",  Medium: "Medium",  Large: "Large"  },
      shots:  {
        "Single Shot": "Single Shot",
        "Double Shot": "Double Shot",
        "Triple Shot": "Triple Shot",
      },
      milks:  {
        "Whole Milk":  "Whole Milk",
        "Oat Milk":    "Oat Milk",
        "Almond Milk": "Almond Milk",
        "Skim Milk":   "Skim Milk",
        "No Milk":     "No Milk",
      },
    },
  },

  fr: {
    // NavBar
    nav: {
      checkout: "Paiement",
    },

    // HomePage
    home: {
      welcome:        "Bienvenue à",
      tagline:        "Surmené et sous-caféiné ?\nOn est passé par là.",
      orderNow:       "Commander",
      ourLocations:   "Nos emplacements",
      locationsTitle: "Nos emplacements",
      weekdays:       "Jours de semaine",
      weekends:       "Fins de semaine",
      callUs:         "Appelez-nous",
      emailUs:        "Écrivez-nous",
      mainBranch:     "Succursale principale",
      secondLocation: "2e emplacement",
    },

    // MenuPage
    menu: {
      tabs: {
        Food:               "Nourriture",
        "Baked Goods":      "Pâtisseries",
        Coffee:             "Café",
        "Specialty Drinks": "Boissons spéciales",
      },
      hotCoffee:   "Café chaud",
      icedCoffee:  "Café glacé",
      comingSoon:  "Cette section arrive bientôt !",
      itemsInCart: (n) => `${n} article${n > 1 ? "s" : ""} dans le panier`,
      checkout:    "Paiement →",
    },

    // Coffee item names
    coffeeNames: {
      espresso:        "Espresso classique",
      cappuccino:      "Cappuccino",
      flatWhite:       "Flat White",
      caramelLatte:    "Latte au caramel",
      icedAmericano:   "Americano glacé",
      coldBrew:        "Cold Brew",
      icedVanillaLatte:"Latte à la vanille glacé",
      icedMatchaLatte: "Latte au matcha glacé",
    },

    // Coffee item descriptions
    coffeeDesc: {
      espresso:         "Essayez notre espresso classique !",
      cappuccino:       "Essayez notre cappuccino !",
      flatWhite:        "Essayez notre flat white !",
      caramelLatte:     "Essayez notre latte au caramel !",
      icedAmericano:    "Essayez notre americano glacé !",
      coldBrew:         "Essayez notre cold brew !",
      icedVanillaLatte: "Essayez notre latte à la vanille glacé !",
      icedMatchaLatte:  "Essayez notre latte au matcha glacé !",
    },

    // LocationPage
    location: {
      heading:        "Choisissez un lieu de ramassage",
      subheading:     "Choisissez où vous souhaitez récupérer votre commande.",
      weekdays:       "Jours de semaine",
      weekends:       "Fins de semaine",
      timeHeading:    "Choisissez une heure de ramassage",
      continue:       "Continuer vers le résumé →",
      hint:           "Veuillez sélectionner un emplacement pour continuer.",
      mainBranch:     "Succursale principale",
      secondLocation: "2e emplacement",
    },

    // OrderSummary
    order: {
      emptyTitle:   "Votre panier est vide",
      emptyMsg:     "Rendez-vous au menu et ajoutez des articles !",
      browseMenu:   "Parcourir le menu",
      title:        "Résumé de\nla commande",
      pickupLabel:  "Lieu et heure de ramassage",
      summaryLabel: "Résumé de la commande",
      subtotal:     "Sous-total",
      tax:          "Taxe (13 %)",
      total:        "Total",
      confirm:      "Confirmer la commande ✓",
    },

    // CustomizeModal
    modal: {
      sizeLabel:  "Option de taille",
      shotsLabel: "Doses d'espresso",
      milkLabel:  "Lait",
      addBtn:     (total) => `Ajouter à la commande — $${total}`,
      sizes: { Small: "Petit",  Medium: "Moyen",  Large: "Grand"  },
      shots: {
        "Single Shot": "Simple",
        "Double Shot": "Double",
        "Triple Shot": "Triple",
      },
      milks: {
        "Whole Milk":  "Lait entier",
        "Oat Milk":    "Lait d'avoine",
        "Almond Milk": "Lait d'amande",
        "Skim Milk":   "Lait écrémé",
        "No Milk":     "Sans lait",
      },
    },
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  const toggle = () => setLang((l) => (l === "en" ? "fr" : "en"));
  const t = translations[lang];
  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
