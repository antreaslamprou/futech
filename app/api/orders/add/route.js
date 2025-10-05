import { addOrder } from "@/lib/db";
import { sendOrderConfirmation } from "@/services/emailService"

export async function POST(req) {
  try {
    const body = await req.json();
    const { basket, user } = body;

    if (!basket || !user || !user.id) {
      return new Response(
        JSON.stringify({ error: 'Missing basket or user info' }),
        { status: 400 }
      );
    }

    const result = await addOrder(basket, user.id);

    const orderData =  {
      id: result.id || result.orderId, 
      total: result.total,
      items: basket
    };
    
    try {
      await sendOrderConfirmation(email, user.firstName, orderData);
    } catch (emailError) {
      console.error("Failed to order confirmation email:", emailError);
    }
    
    return new Response(
      JSON.stringify({ success: true, orderId: result.orderId }),
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Checkout error:', error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to place order" }),
      { status: 500 }
    );
  }
}