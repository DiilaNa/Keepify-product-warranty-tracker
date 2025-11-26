import { Response } from "express";
import { Warranty } from "../model/Warranty";
import { AuthRequest } from "../middleware/auth";

export const loadWarrantyPosts = async(req: AuthRequest, res: Response) => {
    try{
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const posts = await Warranty.find()
        .populate("name","description")
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit);

        const total = await Warranty.countDocuments();
        const totalPages = Math.ceil(total / limit);
        
        res.status(200).json({
            message:"Warranty Posts fetched successfully",
            data:posts,
            page,
            totalPages,
            totalWarranties: total
        })

    }catch(error:any){
        res.status(500).json({
            message:"Error in Fetching Warranty Posts",
            error: error?.message
        })
    }
}