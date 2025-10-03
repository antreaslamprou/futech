import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Products
export async function getProducts() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM products");
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getProduct(id) {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM products WHERE id=$1",[id]);
    return result.rows[0];
  } finally {
    client.release();
  }
}

// Orders
export async function addOrder(basket, userId) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const total = basket.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const orderResult = await client.query(
      `INSERT INTO orders (user_id, total, order_date) 
      VALUES ($1, $2, CURRENT_TIMESTAMP) 
      RETURNING id`, 
      [userId, total]
    );
    const orderId = orderResult.rows[0].id;

    for (let item of basket) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
        VALUES ($1, $2, $3, $4)`,
        [orderId, item.id, item.quantity, item.totalPrice]
      );
    }

    await client.query('COMMIT');

    return { orderId };
  } catch (err) {
    await client.query('ROLLBACK'); 
    throw err;  
  } finally {
    client.release(); 
  }  
}

export async function getOrders(userId) {
  const client = await pool.connect();
  try {
    const orderResult = await client.query(
      `SELECT * FROM orders WHERE user_id=$1`,[userId]
    );

    const orders = orderResult.rows;
    return orders;
  } catch (err) {
    throw err;  
  } finally {
    client.release(); 
  }  
}

// Users
export async function createUser({ firstName, lastName, email, password, address, country }) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN'); 
    const query = `
      INSERT INTO users (firstName, lastName, email, password, address, country)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [firstName, lastName, email, password, address, country];
    const res = await client.query(query, values);

    await client.query('COMMIT');

    return res.rows[0];
  } catch (err) {
    await client.query('ROLLBACK'); 
    throw err;  
  } finally {
    client.release();
  }
}

export async function getUserByEmail(email) {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT * FROM users WHERE email=$1", [email]);
    return res.rows[0];
  } finally {
    client.release();
  }
}

export async function updateUserByEmail( email, userData) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const keys = Object.keys(userData);
    const values = Object.values(userData);
    const setClause = keys
      .map((key, index) => `"${key}" = $${index + 1}`)
      .join(", ");

    const query = `
      UPDATE users
      SET ${setClause}
      WHERE email = $${keys.length + 1}
      RETURNING *
    `;

    const res = await client.query(query, [...values, email]);

    await client.query('COMMIT');

    return res.rows[0];
  } catch (err) {
    await client.query('ROLLBACK'); 
    throw err;  
  } finally {
    client.release();
  }
}