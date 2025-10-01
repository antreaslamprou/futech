import { Client } from "@neondatabase/serverless";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});


export async function getProducts() {
  await client.connect();
  const result = await client.query("SELECT * FROM products");
  await client.end();
  
  return result.rows;
}

export async function getUserByEmail(email) {
  await client.connect();
  const res = await client.query("SELECT * FROM users WHERE email=$1", [email]);
  await client.end();

  return res.rows[0];
}

export async function createUser({ firstName, lastName, email, password, address, country }) {
  const query = `
    INSERT INTO users (firstName, lastName, email, password, address, country)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [firstName, lastName, email, password, address, country];

  await client.connect();
  const res = await client.query(query, values);
  await client.end();

  return res.rows[0];
}