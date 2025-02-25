import z from 'zod'
export const diagonosisSchema=z.object({
    user_id: z.number(),
    diagnosis: z.string(),
    recommendations: z.string(),
})
