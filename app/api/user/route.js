import { getUserByEmail } from "@/lib/db";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new Response(JSON.stringify({ success: false, error: "No user logged in" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    const currentUser = await getUserByEmail(session.user.email);
    
    return new Response(JSON.stringify({ success: true, user: currentUser }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}