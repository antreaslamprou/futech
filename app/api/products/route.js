import { getProducts } from "@/lib/db";


export async function GET(req) {
  try {
    const products = await getProducts();

    return new Response(
      JSON.stringify({ success: true, products }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);

    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch products" }),
      { status: 500 }
    );
  }
}