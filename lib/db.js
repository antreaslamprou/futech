import { Client } from "@neondatabase/serverless";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

await client.connect();

export async function getProducts() {
  const result = await client.query("SELECT * FROM products");
  return result.rows;
}

export async function getProduct(id) {
  const result = await client.query("SELECT * FROM products WHERE id=$1",[id]);
  return result.rows[0];
}

export async function getUserByEmail(email) {
  const res = await client.query("SELECT * FROM users WHERE email=$1", [email]);
   return res.rows[0];
}

export async function createUser({ firstName, lastName, email, password, address, country }) {
  const query = `
    INSERT INTO users (firstName, lastName, email, password, address, country)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [firstName, lastName, email, password, address, country];
  const res = await client.query(query, values);
  return res.rows[0];
}