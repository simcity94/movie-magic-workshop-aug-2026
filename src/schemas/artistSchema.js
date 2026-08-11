import * as z from "zod";

export const createArtistSchema = z.object({
    name: z.string()
        .min(5, { message: "Name must be at least 5 characters long" })
        .regex(/^[A-Za-z0-9 ]+$/, { message: "Name must contain only letters, numbers, and spaces" }),
    age: z.coerce.number()
        .min(1, { message: "Age must be at least 0" })
        .max(120, { message: "Age must be at most 120" }),
    born: z.string()
        .min(10, { message: "Born must be at least 10 characters long" })
        .regex(/^[A-Za-z0-9 ]+$/, { message: "Born must contain only letters, numbers, and spaces" }),
    imageUrl: z.string()
        .regex(/^(https?:\/\/)/, { message: "Image url must start with http:// or https://" }),
});