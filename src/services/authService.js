import userRepository from "../repositories/userRepository.js";

export function registerUser(userData) {

    return userRepository.register(userData);

};

const authService = {
    registerUser
};

export default authService;