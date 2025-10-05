import { sendResetLink } from '@/lib/db';

export async function POST(req) {
  const { userId, email } = await req.json();
  if (!userId || !email) {
    return new Response(
      JSON.stringify({ success: false, error: "Missing user ID or email" }),
      { status: 400 }
    );
  }

  try {
    await sendResetLink(userId, email);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("sendResetLink error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to send reset link" }),
      { status: 500 }
    );
  }
}
