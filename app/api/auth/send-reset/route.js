import bcrypt from "bcryptjs";
import { getTokenDataByToken, updatePassword } from '@/lib/db';

export async function GET(req) {
  const url  = new URL(req.url);
  const searchParams = url.searchParams;
  const token = searchParams.get('token');
  
  if (!token) {
    return new Response(
      JSON.stringify({ success: false, error: "Token is required" }),
      { status: 400 }
    );
  }
  
  try {
    const data = await getTokenDataByToken(token);
    
    if (!data) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid token!" }),
        { status: 400 }
      );
    }

    const tokenData = data.tokenData;
    
    if (tokenData.isUsed) {
      return new Response(
        JSON.stringify({ success: false, error: "Token already used!" }),
        { status: 400 }
      );
    }
    
    const dateNow = new Date();
    const expireDate = tokenData.expiresAt;

    if (dateNow > expireDate) {
      return new Response(
        JSON.stringify({ success: false, error: "Token expired!" }),
        { status: 400 }
      );
    }

    return new Response(JSON.stringify({ success: true, userId: tokenData.userId }), { status: 200 });
  } catch (err) {
    console.error("error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to reset link" }),
      { status: 500 }
    );
  }
}


export async function POST(req) {
  const { token, userId, password } = await req.json();
  
  if (!userId) {
    return new Response(
      JSON.stringify({ success: false, error: "Missing user ID or email" }),
      { status: 400 }
    );
  }

  try {
    const BCRYPT_SALT_ROUNDS  = Number(process.env.BCRYPT_SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    await updatePassword(token, userId, hashedPassword);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to reset password" }),
      { status: 500 }
    );
  }
}
