import { getOrderItems } from "@/lib/db";


export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const orders = await getOrderItems(id);

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