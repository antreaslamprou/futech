import { createUser, getUserByEmail } from "lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password, address, country } = body;

    if (!firstName || !lastName || !email || !password || !address || !country) {
      return new Response(JSON.stringify({ success: false, error: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const existing = await getUserByEmail(email);
    if (existing) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 409 });
    }

    const hashed = await bcrypt.hash(password, process.env.BCRYPT_SALT_ROUNDS);
    const newUser = await createUser({ firstName, lastName, email, password: hashed, address, country });

    return new Response(JSON.stringify({ success: true, user: newUser }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Register error:", err);
    return new Response(JSON.stringify({ success: false, error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}