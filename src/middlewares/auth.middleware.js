export function authMiddleware(req, res, next) {
    const cookies = req.cookies;

    console.log('Cookies:', cookies);

    next();
};

export default authMiddleware;