
import { bookingSchema } from "./zvalidator";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { listBookings, getBookings, createBookings, updateBookings, deleteBookings } from "./booking.controller";
import { adminRoleAuth } from "../middleware/bearAuth";
export const bookingRouter = new Hono()
bookingRouter.get("/book", listBookings)
bookingRouter.get("/book/:id", getBookings)
bookingRouter.post("/book", zValidator('json', bookingSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createBookings)
bookingRouter.put("/book/:id", updateBookings)
bookingRouter.delete("/book/:id",adminRoleAuth, deleteBookings)