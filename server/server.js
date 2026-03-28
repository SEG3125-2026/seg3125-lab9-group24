// Run with:  node server.js  (from inside the /server folder)

import express  from "express";
import cors     from "cors";
import pg       from "pg";
import dotenv   from "dotenv";

dotenv.config({ path: "./config.env" });


const app  = express();
const pool = new pg.Pool({
  host:     process.env.PG_HOST     || "localhost",
  port:     parseInt(process.env.PG_PORT || "5432"),
  database: process.env.PG_DATABASE || "coffeeshop",
  user:     process.env.PG_USER     || "postgres",
  password: process.env.PG_PASSWORD || "password",
});

app.use(cors());
app.use(express.json());

// ── POST /api/orders ─────────────────────────────────────────────────────────
// Body shape:
//   {
//     location_id : 1,
//     pickup_time : "10:30 AM",
//     items: [
//       { item_id: 1, quantity: 1, size: "Small", shots: "Single Shot", milk: "Whole Milk", line_total: 3.25 },
//       ...
//     ]
//   }
// ─────────────────────────────────────────────────────────────────────────────
app.post("/api/orders", async (req, res) => {
  const { location_id = 1, pickup_time, items = [] } = req.body;

  if (!items.length) {
    return res.status(400).json({ error: "Order must contain at least one item." });
  }

  const cost_total = items.reduce((sum, i) => sum + parseFloat(i.line_total), 0);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // 1. Insert the order row
    const orderResult = await client.query(
      `INSERT INTO "order" (location_id, pickup_time, cost_total)
       VALUES ($1, $2, $3)
       RETURNING order_id`,
      [location_id, pickup_time, cost_total.toFixed(2)]
    );
    const order_id = orderResult.rows[0].order_id;

    // 2. Insert each order item
    for (const item of items) {
      await client.query(
        `INSERT INTO order_item (order_id, item_id, quantity, size, shots, milk, line_total)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          order_id,
          item.item_id,
          item.quantity ?? 1,
          item.size       ?? null,
          item.shots      ?? null,
          item.milk       ?? null,
          parseFloat(item.line_total).toFixed(2),
        ]
      );
    }

    await client.query("COMMIT");
    console.log(`[order saved] order_id=${order_id}  total=$${cost_total.toFixed(2)}`);
    res.status(201).json({ order_id });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error("[order error]", err.message);
    res.status(500).json({ error: "Failed to save order." });
  } finally {
    client.release();
  }
});

// ── Health check ─────────────────────────────────────────────────────────────
app.get("/api/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok" });
  } catch {
    res.status(500).json({ status: "db unreachable" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Coffee shop API running on http://localhost:${PORT}`)
);
