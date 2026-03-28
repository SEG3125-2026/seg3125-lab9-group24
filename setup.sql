DROP TABLE IF EXISTS order_item;
DROP TABLE IF EXISTS "order";
DROP TABLE IF EXISTS menu_item;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS "location";

CREATE TABLE location (
  location_id   SERIAL        PRIMARY KEY,
  name          VARCHAR(100)  NOT NULL,
  address       VARCHAR(200)  NOT NULL,
  phone         VARCHAR(20),
  open_hours    VARCHAR(100)
);

CREATE TABLE category (
  category_id   SERIAL      PRIMARY KEY,
  category_name VARCHAR(50) NOT NULL
);

CREATE TABLE menu_item (
  item_id       SERIAL        PRIMARY KEY,
  category_id   INT           NOT NULL REFERENCES category(category_id),
  item_name     VARCHAR(100)  NOT NULL,
  description   TEXT,
  price         NUMERIC(6,2)  NOT NULL,
  is_available  BOOLEAN       NOT NULL DEFAULT TRUE
);

CREATE TABLE "order" (
  order_id      SERIAL        PRIMARY KEY,
  location_id   INT           NOT NULL REFERENCES location(location_id),
  order_date    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  pickup_time   VARCHAR(20),
  cost_total    NUMERIC(8,2)  NOT NULL
);

CREATE TABLE order_item (
  order_item_id SERIAL        PRIMARY KEY,
  order_id      INT           NOT NULL REFERENCES "order"(order_id) ON DELETE CASCADE,
  item_id       INT           NOT NULL REFERENCES menu_item(item_id),
  quantity      INT           NOT NULL DEFAULT 1,
  size          VARCHAR(20),
  shots         VARCHAR(30),
  milk          VARCHAR(30),
  line_total    NUMERIC(8,2)  NOT NULL
);

INSERT INTO location (name, address, phone, open_hours)
VALUES ('Main Street Café', '123 Fillerspace St. Any City, ON', '(123) 456-7890', 'Mon–Sun 7 AM – 8 PM');

INSERT INTO category (category_name)
VALUES ('Hot Coffee'), ('Iced Coffee');

INSERT INTO menu_item (category_id, item_name, description, price, is_available)
VALUES
  (1, 'Espresso',           'A bold, concentrated shot of pure coffee.',           3.25, TRUE),
  (1, 'Cappuccino',         'Espresso topped with steamed and frothed milk.',       4.75, TRUE),
  (1, 'Flat White',         'Velvety microfoam espresso, smooth and creamy.',       4.50, TRUE),
  (1, 'Caramel Latte',      'Espresso, steamed milk, and rich caramel drizzle.',    5.25, TRUE),
  (2, 'Iced Americano',     'Shots of espresso over ice, topped with cold water.',  4.00, TRUE),
  (2, 'Cold Brew',          'Steeped 16 hours for a smooth, bold flavour.',         4.75, TRUE),
  (2, 'Iced Vanilla Latte', 'Espresso, milk, and vanilla syrup over ice.',          5.50, TRUE),
  (2, 'Iced Matcha Latte',  'Stone-ground matcha blended with milk over ice.',      5.75, TRUE);