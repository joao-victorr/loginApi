import passport from "passport";
import dotenv from 'dotenv';
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { User, UserInstance } from "../models/users";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { request } from "http";

dotenv.config();

const notAuthorized = {status: 404, message: 'Not authorized'};


const extractTokenFromCookie = (req: Request) => {
    if (req && req.cookies) {
        return req.cookies.authorization;
    }
    return null;
};

const options = {
    jwtFromRequest: extractTokenFromCookie,
    secretOrKey: process.env.JWT_SECRET as string,
}


passport.use(new JWTStrategy(options, async (payload, done) => {

    const user = await User.findByPk(payload.id);

    if(user) {
        return done(null, user);
    } else {
        return done(notAuthorized, false);
    }

}));

export const generateToken = (data: object) => {
    return jwt.sign(data, process.env.JWT_SECRET as string)
};

export const privateRouter = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', (err: Error, user: UserInstance) => {
        req.user = user;
        return user ? next() : next(notAuthorized)
    })(req, res, next);
};


export default passport