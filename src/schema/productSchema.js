import z from 'zod'

export const schema = z.object({
    name: z.string().min(1, "name is required"),
    price: z.coerce.number({
    invalid_type_error: "price must be a number"})
    .min(0.1, "price must be greater than 0")
    .max(100000, "price cannot exceed 1,00,000"),
    category: z.string().min(1, "category is required"),
    description: z.string().min(4,"description is required"),
    rating: z.coerce.number({
    invalid_type_error: "rating must be a number"})
    .min(1, "rating must be greater than 0")
    .max(5, "rating cannot exceed 5"),
    image: z.any().refine((file) => file?.length > 0, "image is required")
})

export const editSchema = z.object({
    name: z.string().min(1, "name is required"),
    price: z.coerce.number({
    invalid_type_error: "price must be a number"})
    .min(0.1, "price must be greater than 0")
    .max(100000, "price cannot exceed 1,00,000"),
    category: z.string().min(1, "category is required"),
    description: z.string().min(4,"description is required"),
    rating: z.coerce.number({
    invalid_type_error: "rating must be a number"})
    .min(1, "rating must be greater than 0")
    .max(5, "rating cannot exceed 5"),
    image: z.any().optional()
})