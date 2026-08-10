import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerUser(userData) {
    const hashPassword = await bcrypt.hash(userData.password, 10);

    return userRepository.create({
        ...userData,
        password: hashPassword
    });
};

export async function loginUser(userData) {
    const user = await userRepository.findByEmail(userData.email);

    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(userData.password, user.password);

    if (!isPasswordValid) {
        throw new Error("Invalid password");
    };

    const payload = {
        id: user.id,
        email: user.email
    };

    const token = jwt.sign(payload, 'SECRETDONTTELLANYONE', { expiresIn: "2h" });

    return token;
};

const authService = {
    registerUser,
    loginUser
};

export default authService;