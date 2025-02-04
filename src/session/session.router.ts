import { Hono } from "hono";
import { listSessions, getsession, createsession, updatesession, deletesession, } from "./session.controller"
import { zValidator } from "@hono/zod-validator";
import { sessionsSchema } from "./validator"; 
import { adminRoleAuth } from '../middleware/bearAuth'
export const sessionRouter = new Hono();
//get all sessions
sessionRouter.get("/sessions",adminRoleAuth ,listSessions) 

//get a single session   api/sessions/1
sessionRouter.get("/sessions/:id",adminRoleAuth, getsession)

// create a session 
sessionRouter.post("/sessions", zValidator('json', sessionsSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createsession)

//update a session
sessionRouter.put("/sessions/:id", updatesession) 

sessionRouter.delete("/sessions/:id",adminRoleAuth, deletesession)

