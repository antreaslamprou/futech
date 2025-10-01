import { getProduct } from "lib/db";


export async function GET(req, {params}) {
  const { id } = await params;

  try {
    const product = await getProduct(id);

    if (!product) {
      return new Response(
        JSON.stringify({ success: false, error: "Product not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, product }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error("Error fetching product:", error);

    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch product" }), { 
        status: 500 ,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
