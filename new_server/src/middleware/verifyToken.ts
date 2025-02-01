import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";

interface JwtPayload {
    id: string;
}

const JWT_SECRET = process.env.JWT_SECRET;

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    const tokenSchema = z.string();

    try {
        const parseToken = tokenSchema.safeParse(req.cookies.token);

        if (!parseToken.success) {
            return res.status(401).json({ message: "You are not signed in" });
        }

        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET not configured");
        }

        const verify = jwt.verify(parseToken.data, JWT_SECRET) as JwtPayload;

        if (verify) {
            req.studentId = verify.id;
            return next();
        }

        res.status(401).json({ message: "Unauthorized" });
    } catch (error) {
        console.error("Server-side error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
