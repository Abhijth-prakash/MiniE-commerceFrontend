// schema/userSchema.js (registration)
import { z } from 'zod'

export const registerSchema = z.object({
    name:            z.string().min(1, "Name is required"),
    email:           z.string().email("Email is invalid"),
    password:        z.string().min(4, "Minimum 4 characters"),
    confirmpassword: z.string().min(4, "Minimum 4 characters")
}).refine(data => data.password === data.confirmpassword, {
    message: "Passwords don't match",
    path: ["confirmpassword"]
})

export const loginSchema = z.object({
    email:    z.string().email("Email is invalid"),
    password: z.string().min(4, "Minimum 4 characters")
})