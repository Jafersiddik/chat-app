import { Request, Response } from "express";
import * as userService from '../services/user';
import { errorResponse, failureResponse, successResponse, unAuthResponse,invalidResponse } from "../utils/response";
import User from "../models/user";
import jwt from 'jsonwebtoken'
import config from "../config/config";
const jwtSecretKey = config.jwtSecret;
import {validationResult} from "express-validator"

export const signin = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return invalidResponse(req, res, { data: errors.array() })
        }
        // console.log(req.body)
        const { name, password } = req.body;
        const chk_user = await User.findOne({ name: name }).select('name _id')
        // const isMatch = await User.comparePassword(userData.password);
        console.log("1")
        if (!chk_user) {
            return failureResponse(req, res, { data: [], message: "Invalid user name" })
        } else {

            const payload = {
                id: chk_user.id.toString(), 
                name: chk_user.name,
            };
            console.log(payload)
            const token = jwt.sign(payload, jwtSecretKey);
            // console.log(io)
            // io.emit("newUser", chk_user)
            return successResponse(req, res, { data: { ...chk_user, ...{ token: token } }, message: "Login successful" })
        }
    } catch (e) {
        console.log(e)
        return errorResponse(req, res, { data: [], message: "Server error" })
    }
}

export const signup = async (req: Request, res: Response) => {
    try {
        // console.log(req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return invalidResponse(req, res, { data: errors.array() })
        }
        const { name, password } = req.body;

        const chk_user = await User.findOne({ name: name }).select('name _id')
        // const isMatch = await User.comparePassword(userData.password);
        console.log(chk_user)
        if (chk_user) {
            return failureResponse(req, res, { data: [], message: "User already exist" })
        } else {
            const result = await userService.createUser({ name, password })
            const payload = {
                id: result.id.toString(), 
                name: result.name,
            };
            console.log(payload)
            const token = jwt.sign(payload, jwtSecretKey);
            // io.emit("newUser", chk_user)
            return successResponse(req, res, { data: result, token: token, message: "Login successful" })
        }
    } catch (e) {
        console.log(e)
        return errorResponse(req, res, { data: [], message: "Server error" })
    }
}
