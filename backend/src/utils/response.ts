import { Request, Response } from 'express';

interface ResponseData {
    req: Request;
    res: Response;
    message: JSON;
    data?: any;
}


// success
export const successResponse = async (req: any, res: any, data: any) => {
    res.status(200).json({ status: true, message: data.message, data: data.data });
    res.end();
}

// failure
export const failureResponse = async (req: any, res: any, data: any) => {
    res.status(200).json({ status: false, message: data.message, data: data.data });
    res.end();
}

// internal server error
export const errorResponse = async (req: any, res: any, data: any) => {
    res.status(500).json({ status: false, message: "Server Error" });
    res.end();
}

export const unAuthResponse = async (req: any, res: any, data: any) => {
    res.status(403).json({ status: false, message: "unAuthorized" });
    res.end();
}

export const invalidResponse = async (req: any, res: any, data: any) => {
    res.status(400).json({ status: false, message: "Validation error", errors:data.data });
    res.end();
}

