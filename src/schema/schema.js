import z from 'zod'

export const schema = z.object({
    name: z.string().min(1, "name is required"),
    price: z.coerce.number().min(1, "price is required"),
    category: z.string().min(1, "category is required"),
    image: z.any().refine((file) => file?.length > 0, "image is required")
})