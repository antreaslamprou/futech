import { Pool } from 'pg';
import crypto from 'crypto';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

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

// Countries
export async function getCountries() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM countries");
    return result.rows;
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

    const orders = camelcaseKeys(orderResult.rows);
    return orders;
  } catch (err) {
    throw err;  
  } finally {
    client.release(); 
  }  
}

export async function getOrderItems(orderId) {
  const client = await pool.connect();
  try {
    orderId = Number(orderId);
    const orderResult = await client.query(
      `SELECT * FROM order_items WHERE order_id=$1`,[orderId]
    );

    const orderItems = camelcaseKeys(orderResult.rows);
    return orderItems;
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
      INSERT INTO users (first_name, last_name, email, password, address, country)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [firstName, lastName, email, password, address, country];
    const res = await client.query(query, values);

    await client.query('COMMIT');

    return camelcaseKeys(res.rows[0]);
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
    const res = await client.query(`SELECT * FROM users WHERE email = $1`,[email]);
    return camelcaseKeys(res.rows[0]);
  } finally {
    client.release();
  }
}

export async function updateUserByEmail( email, userData) {
  const client = await pool.connect();
  userData = snakecaseKeys(userData);

  try {
    await client.query('BEGIN');

    const allowedFields = ['first_name', 'last_name', 'address', 'country'];
    
    // Filter input to only include allowed fields
    const filteredData = Object.entries(userData).filter(([key]) =>
      allowedFields.includes(key)
    );

    const keys = filteredData.map(([key]) => key);
    const values = filteredData.map(([, value]) => value);

    if (keys.length === 0) {
      client.release();
      throw new Error("No valid fields to update.");
    }

    const setClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

    const query = `
      UPDATE users
      SET ${setClause}
      WHERE email = $${keys.length + 1}
      RETURNING *
    `;

    const res = await client.query(query, [...values, email]);

    await client.query('COMMIT');

    return camelcaseKeys(res.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK'); 
    throw err;  
  } finally {
    client.release();
  }
}

// Reset Link
export async function sendResetLink(userId, email) {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 mins

  const client = await pool.connect();
  try {
    await client.query(`
      INSERT INTO password_reset_tokens (user_id, token, expires_at)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id)
      DO UPDATE SET token = $2, expires_at = $3
    `, [userId, token, expiresAt]);

    const link = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

    await resend.emails.send({
      from: 'antreaslamprou12@gmail.com',
      to: email,
      subject: 'Reset your password',
      html: `<p>Click to reset your password: <a href="${link}">${link}</a></p>`,
    });

    return { success: true };
  } catch (error) {
    console.error('Reset link error:', error);
    throw error;
  } finally {
    client.release();
  }
}