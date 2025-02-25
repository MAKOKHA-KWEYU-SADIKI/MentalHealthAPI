import { integer } from 'drizzle-orm/pg-core'
import { z } from 'zod'


export const sessionsSchema = z.object({
      therapist_id: z.number(),
      user_id: z.number(),
      session_notes: z.string(),
      session_date: z.date(),
})

