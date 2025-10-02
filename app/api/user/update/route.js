import { updateUserByEmail } from 'lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, userData } = await req.json();

    if (!email || !userData) {
      return NextResponse.json({ success: false, error: "Missing email or user data" }, { status: 400 });
    }

    const updatedUser = await updateUserByEmail(email, userData);

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
