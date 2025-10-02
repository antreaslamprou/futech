import { getUserByEmail } from "lib/db";


export async function GET() {
  try {
    const currentUser = await getUserByEmail(email);
    
    return new Response(JSON.stringify({ success: true, user: currentUser }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching user", err);
    return new Response(JSON.stringify({ success: false, error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}