import { createResetLink } from '@/lib/db';
import { sendPasswordReset } from '@/services/emailService';

export async function POST(req) {
  const { userId, email } = await req.json();
  if (!userId || !email) {
    return new Response(
      JSON.stringify({ success: false, error: "Missing user ID or email" }),
      { status: 400 }
    );
  }

  try {
    const resetLink = await createResetLink(userId);

    try {
      await sendPasswordReset(email, resetLink.token)
    } catch (emailError) {
      console.error("Failed to send reset password email:", emailError);
    }   
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to send reset link" }),
      { status: 500 }
    );
  }
}
