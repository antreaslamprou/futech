import { getOrders } from "@/lib/db";


export async function POST(req) {
  try {
    const { userId } = await req.json(); 
    const orders = await getOrders(userId);

    return new Response(
      JSON.stringify({ success: true, orders }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching orders:", error);

    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch orders" }),
      { status: 500 }
    );
  }
}