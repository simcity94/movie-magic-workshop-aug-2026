import { prisma } from "../lib/prisma.js";

export async function register(userData) {
    const result = await prisma.user.create({
        data: {
            email: userData.email,
            password: userData.password
        }
    });

    return result;
}

const userRepository = {
    register
};

export default userRepository;