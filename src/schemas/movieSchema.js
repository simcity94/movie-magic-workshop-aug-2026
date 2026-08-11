import * as z from "zod";

export const createMovieSchema = z.object({
    title: z.string()
        .min(5, {message: "Title must be at least 5 characters long"})
        .regex(/^[A-Za-z0-9 ]+$/, {message: "Title must contain only letters, numbers, and spaces"}),
    category: z.enum(
        ['tv-show', 'anime', 'action', 'animation', 'movie', 'documentary', 'short-film'], 
        {message: "Invalid movie category"}),
    genre: z.string()
        .min(5, {message: "Genre must be at least 5 characters long"})
        .regex(/^[A-Za-z0-9 ]+$/, {message: "Genre must contain only letters, numbers, and spaces"}),
    director: z.string()
        .min(5, {message: "Director must be at least 5 characters long"})
        .regex(/^[A-Za-z0-9 ]+$/, {message: "Director must contain only letters, numbers, and spaces"}),
    year: z.coerce.number()
        .min(1900, {message: "Year must be at least 1900"})
        .max(new Date().getFullYear(), {message: `Year must be between 1900 and ${new Date().getFullYear()}`}),
    imageUrl: z.string()
        .regex(/^(https?:\/\/)/, {message: "Image url must start with http:// or https://"}),
    rating: z.coerce.number()
        .min(0, {message: "Rating must be at least 0"})
        .max(10, {message: "Rating must be at most 10"}),
    description: z.string()
        .min(20, {message: "Description must be at least 20 characters long"})
        .regex(/^[A-Za-z0-9 ]+$/, {message: "Description must contain only letters, numbers, and spaces"}),
    // name: z.string()
    //     .min(5, {message: "Name must be at least 5 characters long"})
    //     .regex(/^[A-Za-z0-9 ]+$/, {message: "Name must contain only letters, numbers, and spaces"}),
    // age: z.coerce.number()
    //     .min(1, {message: "Age must be at least 0"})
    //     .max(120, {message: "Age must be at most 120"}),
    // born: z.string()
    //     .min(10, {message: "Born must be at least 10 characters long"})
    //     .regex(/^[A-Za-z0-9 ]+$/, {message: "Born must contain only letters, numbers, and spaces"}),
    // character: z.string()
    //     .min(5, {message: "Character must be at least 5 characters long"})
    //     .regex(/^[A-Za-z0-9 ]+$/, {message: "Character must contain only letters, numbers, and spaces"}),
    
});

