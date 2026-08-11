import * as z from "zod";
import userRepository from "../repositories/userRepository.js";

const createUserSchema = z.object({
    email: z.string()
        .email({ message: "Invalid email address" })
        .min(10, { message: "Email must be at least 10 characters long" })
        .refine(async (value) => {
           const user = await userRepository.findByEmail(value);
           return !user;
        }, { message: "Email already exists" }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .regex(/^[A-Za-z0-9]+$/, { message: "Password must contain only letters and numbers" }),
        repeatPassword: z.string()
}).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"]
}).transform(({repeatPassword, ...rest}) => {
    return rest;
});

export default createUserSchema;