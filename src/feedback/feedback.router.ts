import{Hono} from "hono"
import { Context } from "hono";
import { listfeedback,getfeedback,deletefeedback,createfeedback,updatefeedback } from "../feedback/feedback.controller";
import { adminRoleAuth,userRoleAuth,docctorRoleAuth } from "../middleware/bearAuth";
import { zValidator } from "@hono/zod-validator";
import { feedbackSchema } from "./zvalidaor";
export const feedbackRouter = new Hono();
feedbackRouter.get("/feedback",listfeedback);
feedbackRouter.get("/feedback/:id", getfeedback)

feedbackRouter.post("/feedback", zValidator('json', feedbackSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createfeedback)
feedbackRouter.put("/feedback/:id", updatefeedback)
feedbackRouter.delete("/feedback/:id", deletefeedback)