// import { sendWelcomeEmail } from "@/services/emailService"


// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { firstName, email } = body;

//     try {
//       await sendWelcomeEmail(email, firstName);
//     } catch (emailError) {
//       console.error("Failed to send welcome email:", emailError);
//     }
//   } catch (err) {
//     console.error("Register error:", err);
//   }
// }