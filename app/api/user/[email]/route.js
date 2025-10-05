import { getUserByEmail } from "@/lib/db";


export async function GET(req, { params }) {
  try {
    const { email } = await params;
    const user = await getUserByEmail(email);

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, error: "User not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, user }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);

    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch user" }),
      { status: 500 }
    );
  }
}