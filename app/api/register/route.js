import { createUser, getUserByEmail } from "lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { firstName, lastName, email, password, address, country } = await req.json();

  if (!firstName || !lastName || !email || !password || !address || !country) {
    return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
  }

  const existing = await getUserByEmail(email);
  if (existing) {
    return new Response(JSON.stringify({ error: "User already exists" }), { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({ firstName, lastName, email, password:hashedPassword, address, country });

  return new Response(JSON.stringify({ success: true }), { status: 201 });
}
