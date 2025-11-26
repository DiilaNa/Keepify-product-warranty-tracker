import { Response } from "express";
import { User } from "../model/User";
import { AuthRequest } from "../middleware/auth";

export const loadUserDetails = async(req: AuthRequest, res: Response) => {
    try{
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const posts = await User.find()
        .populate("firstname","email")
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit);

        const total = await User.countDocuments();
        const totalPages = Math.ceil(total / limit);
        
        res.status(200).json({
            message:"User Details fetched successfully in admin page",
            data:posts,
            page,
            totalPages,
            totalUsers: total
        })

    }catch(error:any){
        res.status(500).json({
            message:"Error in Fetching User Details in admin page",
            error: error?.message
        })
    }
}