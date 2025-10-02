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

// Users
export async function createUser({ firstName, lastName, email, password, address, country }) {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO users (firstName, lastName, email, password, address, country)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [firstName, lastName, email, password, address, country];
    const res = await client.query(query, values);
    return res.rows[0];
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
    return res.rows[0];
  } finally {
    client.release();
  }
}