import { Response, Request, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { string, z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRoute = Router();
const client = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECERT

authRoute.post('/signup', async (req: Request, res: Response): Promise<any> => {
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
            where: {
                collegeId: collegeId
            }
        });

        if (!existCollegeId) {
            return res.status(400).json({ message: "Invalid College Id" });
        }

        //check student exist or not
        const existStudent = await client.student.findFirst({
            where: {
                collegeId: collegeId
            }
        });

        if (existStudent) {
            return res.status(400).json({ message: "Student already exist with this CollegeId" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await client.student.create({
            data: {
                collegeId: collegeId,
                password: hashPassword
            }
        });
        res.status(200).json({ message: "You are register successfully" });
    } catch (error) {
        console.log("server side error", error);
        res.status(500).json({ error: "server side error" });
    }
})

authRoute.post('/signin', async (req: Request, res: Response):Promise<any> => {
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
        const student = await client.student.findFirst({
            where: {
                collegeId: collegeId
            }
        })

        if (!student) {
            return res.status(400).json({ message: "Invalid collegeId or password" });
        }

        const verifyPass = await bcrypt.compare(password, student.password);

        if (!verifyPass) {
            return res.json({ message: "Invalid collegeId or password" });
        }

        if (!JWT_SECRET) {
            throw new Error("JWT SEVRET NOT FUNDED");
        }

        const id = student.id.toString()
        const token = jwt.sign({id}, JWT_SECRET);

        res.cookie('token',token,{
            httpOnly:true,
            secure:false, 
            sameSite:'strict'
        });
        res.status(200).json({message:"You are login successfully"});
    } catch (error) {
        console.log("server side error :", error);
        res.status(500).json({error: "server side error"});
    }
})

export { authRoute };