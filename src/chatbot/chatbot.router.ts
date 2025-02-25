import { Hono } from "hono";
import { chatbotController } from "./chatbot.controller";

const chatbot=new Hono()
chatbot.post("chatbot",chatbotController)
export default chatbot;