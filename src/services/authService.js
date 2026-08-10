import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";

export async function registerUser(userData) {
    const hashPassword = await bcrypt.hash(userData.password, 10);

    return userRepository.register({
        ...userData,
        password: hashPassword
    });
};

const authService = {
    registerUser
};

export default authService;