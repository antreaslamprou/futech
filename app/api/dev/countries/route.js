import { getCountries } from '@/lib/db';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || session.user.email !== "antreaslamprou12@gmail.com") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  try {
    const products = await getCountries();

    const dir = join(process.cwd(), 'public', 'data');
    const filePath = join(dir, 'countries.json');

    mkdirSync(dir, { recursive: true });

    writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');

    return new Response(JSON.stringify({ message: 'Countries saved to ' + filePath }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving countries:', error);
    return new Response(JSON.stringify({ error: 'Failed to save countries' }), { status: 500 });
  }
}