import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const reviewRoute = Router();
const client = new PrismaClient();

reviewRoute.post('/review', authMiddleware, async (req: Request, res: Response): Promise<any> => {
    const requiredBody = z.object({
        collegeName: z.string(),
        departmentName: z.string(),
        teacherName: z.string(),
        review: z.string(),
        rating: z.number().max(5).min(1)
    })

    const parsedBody = requiredBody.safeParse(req.body);
    const studentId = req.studentId;

    if (!parsedBody.success) {
        return res.status(200).json({ message: "Invalid input data" });
    }
    const { collegeName, departmentName, teacherName, review, rating } = parsedBody.data

    try {
        const newReview = await client.review.create({
            data: {
                collegeName: collegeName,
                departmentName: departmentName,
                teacherName: teacherName,
                review: review,
                rating: rating,
                studentId: studentId
            }
        })

        if (!newReview) {
            throw new Error("review not added server side error");
        }
        res.status(200).json({message:"Review added successfully"});
    } catch (error) {
        console.log("server side error");
        res.status(500).json({error:"server side error"});
    }
})

