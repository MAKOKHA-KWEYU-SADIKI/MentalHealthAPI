
import {eq} from "drizzle-orm";
import {db} from "../drizzle/db";
 import { TIbooking, TSbooking, bookings } from "../drizzle/schema";
  interface IBookings {
    user_id: number;
    therapist_id: number;
    session_date: Date;
    booking_status: string;
  }
  export const BookingsService = async (limit?: number): Promise<TSbooking[] | null> => {
    if (limit) {
      return await db.query.bookings.findMany({
        limit: limit
      });
    }
    return await db.query.bookings.findMany();
  };

  
export const getBookingsService = async (id: number): Promise<TIbooking | undefined> => {
    return await db.query.bookings.findFirst({
        where: eq(bookings.id, id)
    });

}
export const createBookingsService = async (user: TIbooking): Promise<any | undefined>=> {
    await db.insert(bookings).values(user)
    return "booking created successfully";

}

export const updateBookingsService = async (id: number, user: TIbooking) => {
    await db.update(bookings).set(user).where(eq(bookings.id, id))
    return "booking updated successfully";
}

export const deleteBookingsService = async (id: number) => {
    await db.delete(bookings).where(eq(bookings.id, id))
    return "booking deleted successfully";
}