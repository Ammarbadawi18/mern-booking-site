import express, { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';

const router = express.Router();

router.post("/", [
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password must be above 6 characters").isLength({
        min: 6
    })
], async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() })
    }

    try {
        let user = await User.findOne({
            email: req.body.email
        });

        if (user) {
            return res.status(400).json({ message: "User already created." })
        }

        user = new User(req.body)
        await user.save();

        //creating a token
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn: "1d"
            }
        );

        res.cookie(
            "auth_token",//name of cookie
            token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',//we want the secure set to true only in production not development because localhost doesn't have https setup.
                maxAge: 8640000
            }
        )
        return res.status(200).send({ message: "User Registered!" });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong!" })
    }
})

export default router;