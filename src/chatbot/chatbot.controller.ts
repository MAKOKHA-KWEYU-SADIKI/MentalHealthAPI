// import { Context } from "hono";
// import chatbotService from "./chatbot.service";

// export const chatbotController = async (c: Context) => {
//   try {
//     const { message } = await c.req.json();
// // 
//     if (!message) {
//       return c.json({ error: "Message is required" }, 400);
//     }

//     const response = await chatbotService.sendMessage(message);

//     // Handle errors from service
//     if (response.error) {
//       return c.json({ error: response.error }, 500);
//     }

//     return c.json({ response });
//   } catch (error) {
//     console.error("Error in chatbot controller:", error);
//     return c.json({ error: "Internal Server Error" }, 500);
//   }
// };
