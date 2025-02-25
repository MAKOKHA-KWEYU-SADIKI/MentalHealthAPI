
import { Context } from "hono";
import {BookingsService, getBookingsService, createBookingsService, updateBookingsService, deleteBookingsService} from "./booking.service";
import*as bcrypt from "bcrypt";
export const listBookings = async (c: Context) => {
    try {
        //limit the number of Bookings to be returned

        const limit = Number(c.req.query('limit'))

        const data = await BookingsService(limit);
        if (data == null || data.length == 0) {
            return c.text("Bookingss not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getBookings = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Bookingss = await getBookingsService(id);
    if (Bookingss == undefined) {
        return c.text("Bookingss not found", 404);
    }
    return c.json(Bookingss, 200);
}
// export const createBookings = async (c: Context) => {
//     try {
//         const Bookingss = await c.req.json();
        
//         const createdBookingss = await createBookingsService(Bookingss);


//         if (!createdBookingss) return c.text("Bookingss not created", 404);
//         return c.json({ msg: createdBookingss }, 201);

//     } catch (error: any) {
//         return c.json({ error: error?.message }, 400)
//     }
// }
export const createBookings = async (c: Context) => {
    try {
        const booking = await c.req.json();
        
        // Ensure session_date is a valid date
        if (!Date.parse(booking.session_date)) {
            return c.json({ error: "Invalid session_date format" }, 400);
        }

        const createdBooking = await createBookingsService({
            ...booking,
            session_date: new Date(booking.session_date).toISOString()
        });

        if (!createdBooking) return c.text("Booking not created", 404);
        return c.json({ msg: createdBooking }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
export const updateBookings = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Bookingss = await c.req.json();
    try {
        // search for the Bookingss
        const searchedBookingss= await getBookingsService(id);
        if (searchedBookingss == undefined) return c.text("Bookingss not found", 404);
        // get the data and update it
        const res = await updateBookingsService(id, Bookingss);
        // return a success message
        if (!res) return c.text("Bookingss not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteBookings = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the Bookingss
        const Bookingss = await getBookingsService(id);
        if (Bookingss== undefined) return c.text("Bookingss not found", 404);
        //deleting the Bookingss
        const res = await deleteBookingsService(id);
        if (!res) return c.text("Bookingss not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
 
 