import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { unAuthResponse } from "../utils/response";
import config from "../config/config";
const jwtSecretKey = config.jwtSecret;

declare global {
    namespace Express {
        interface Request {
            user: { id: string };
            authorize: any;
        }
    }
}

export const isAuthenticate = (req: Request, res: Response, next: NextFunction) => {

    const header = req.headers['authorization']
    const token = header?.split(' ')[1] as string;
    jwt.verify(token, jwtSecretKey, async (err, decoded: any) => {
        if (err) {
            console.log(err);
            return unAuthResponse(req, res, { message: "unauthorize" })
        }
        req.user = { id: decoded.id };
        next();
    })


}