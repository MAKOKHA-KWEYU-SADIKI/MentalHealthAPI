import z from 'zod'
export const bookingSchema=z.object({
    user_id: z.number(),
    therapist_id: z.number(),
    session_date: z.coerce.date(),
    booking_status: z.string()
})