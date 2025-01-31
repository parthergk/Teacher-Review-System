import { Response, Request, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";

const authRoute = Router();
const client = new PrismaClient();

authRoute.post('/signup', async(req: Request, res: Response): Promise<any> => {    
    const requiredBody = z.object({
        collegeId: z.string(),
        password: z.string()
    });

    const bodyData = requiredBody.safeParse(req.body);

    if (!bodyData.success) {
        return res.status(400).json({ message: "Invalid Inputs" });
    }

    const { collegeId, password } = bodyData.data;

    try {
        //verify college id
        const existCollegeId = await client.collegeId.findFirst({
            where:{
                collegeId:collegeId
            }
        });

        if (!existCollegeId) {
            return res.status(400).json({message: "Invalid College Id"});
        }

        //check student exist or not
        const existStudent = await client.student.findFirst({
            where:{
                collegeId:collegeId
            }
        });

        if (existStudent) {
            return res.status(400).json({message: "Student already exist with this CollegeId"});
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await client.student.create({
            data:{
                collegeId: collegeId,
                password: hashPassword
            }
        });
        res.status(200).json({message: "You are register successfully"});
    } catch (error) {
        console.log("server side error", error);
        res.status(500).json({error:"server side error"});
    }
})

export {authRoute};