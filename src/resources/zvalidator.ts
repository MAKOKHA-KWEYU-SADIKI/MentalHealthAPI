import {z}from 'Zod'

export const resourceSchema=z.object({
    title:z.string(),
    content:z.string()
})