import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


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

export async function getUserByEmail(email) {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT * FROM users WHERE email=$1", [email]);
    return res.rows[0];
  } finally {
    client.release();
  }
}

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