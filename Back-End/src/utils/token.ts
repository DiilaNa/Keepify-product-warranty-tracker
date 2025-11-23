import dotenv from "dotenv"
import { IUser } from "../model/User"
import jwt from "jsonwebtoken"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as string

export const signAccessToken = (user: IUser): string => {
    return jwt.sign(
        {
            sub:user._id.toString(),
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "30m"
        }
    )
}

const JWT_REFRESH = process.env.JWT_REFRESH as string

export const signRefreshToken = (user: IUser): string => {
    return jwt.sign(
        {
            sub: user._id.toString()
        },
        JWT_REFRESH,
        {
            expiresIn: "7d"
        }
    )
}