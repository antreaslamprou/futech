// import { sendOrderConfirmation } from "@/services/emailService"


// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { email, firstName, orderData } = body;

//     try {
//       await sendOrderConfirmation(email, firstName, orderData);
//     } catch (emailError) {
//       console.error("Failed to send welcome email:", emailError);
//     }
//   } catch (err) {
//     console.error("Register error:", err);
//   }
// }