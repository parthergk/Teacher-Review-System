import { Response, Request, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRoute = Router();
const client = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

authRoute.post('/signup', async (req: Request, res: Response): Promise<any> => {
    const requiredBody = z.object({
        collegeId: z.string(),
        password: z.string()
    });

    const bodyData = requiredBody.safeParse(req.body);

    if (!bodyData.success) {
        return res.status(400).json({ message: "Invalid input data" });
    }

    const { collegeId, password } = bodyData.data;

    try {
        // Verify college ID
        const existCollegeId = await client.collegeId.findFirst({
            where: {
                collegeId: collegeId
            }
        });

        if (!existCollegeId) {
            return res.status(404).json({ message: "College ID not found" });
        }

        // Check if student already exists
        const existStudent = await client.student.findFirst({
            where: {
                collegeId: collegeId
            }
        });

        if (existStudent) {
            return res.status(409).json({ message: "Student already exists with this College ID" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await client.student.create({
            data: {
                collegeId: collegeId,
                password: hashPassword
            }
        });

        res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        console.error("Server-side error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

authRoute.post('/signin', async (req: Request, res: Response): Promise<any> => {
    const requiredBody = z.object({
        collegeId: z.string(),
        password: z.string()
    });

    const bodyData = requiredBody.safeParse(req.body);

    console.log("Body Parsed", bodyData);
    

    if (!bodyData.success) {
        return res.status(400).json({ message: "Invalid input data" });
    }

    const { collegeId, password } = bodyData.data;

    try {
        const student = await client.student.findFirst({
            where: {
                collegeId: collegeId
            }
        });

        if (!student) {
            return res.status(401).json({ message: "Invalid College ID or password" });
        }

        const verifyPass = await bcrypt.compare(password, student.password);

        if (!verifyPass) {
            return res.status(401).json({ message: "Invalid College ID or password" });
        }

        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET not configured");
        }

        const id = student.id.toString();
        const token = jwt.sign({ id }, JWT_SECRET);

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        });
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Server-side error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export { authRoute };