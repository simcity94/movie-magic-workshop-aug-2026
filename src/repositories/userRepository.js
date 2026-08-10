export function register(userData) {
    console.log('Registering user with data:', userData);
}

const userRepository = {
    register
};

export default userRepository;