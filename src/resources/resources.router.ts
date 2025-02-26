import { Hono } from "hono";
import { listresources, getresource, createresource, updateresource, deleteresource, } from "./resources.controller";
import { zValidator } from "@hono/zod-validator";
import { resourceSchema } from "./zvalidator";
export const resourceRouter=new Hono();

resourceRouter.get("/resource", listresources);
resourceRouter.get("/resource/:id", getresource);
resourceRouter.put("/resource", updateresource);
resourceRouter.delete("/resource/:id", deleteresource);
resourceRouter.post("/resource", zValidator('json', resourceSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createresource)