import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";

export async function registerUser(userData) {
    const hashPassword = await bcrypt.hash(userData.password, 10);

    return userRepository.create({
        ...userData,
        password: hashPassword
    });
};

export async function loginUser(userData) {
    const user = await userRepository.findByEmail(userData.email);

    console.log("user", user);
};

const authService = {
    registerUser,
    loginUser
};

export default authService;