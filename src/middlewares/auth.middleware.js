import jwt, { JsonWebTokenError } from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
    const token = req.cookies.auth;

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, 'SECRETDONTTELLANYONE');
        req.user = decodedToken;

    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).send('Invalid token');
    }

    next();
};

export default authMiddleware;