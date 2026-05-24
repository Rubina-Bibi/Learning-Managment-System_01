import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 
import asyncHandler from 'express-async-handler';

// 1.  middleware to protect the route
export const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        
        //fetch actual user data from Database 
        req.user = await User.findById(decoded.id).select('-password');
        
        if (!req.user) {
            res.status(401);
            throw new Error("User not found");
        }
        
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
    }
});

// 2. Roles check 
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403);
            throw new Error(`User role ${req.user?.role || 'Guest'} is not authorized`);
        }
        next();
    };
};