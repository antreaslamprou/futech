import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  return Response.json({ user: session?.user || null });
}