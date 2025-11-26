import { Request, Response } from "express";
import { Announcement} from "../model/Announcements";

export const loadAllAnnouncements = async(req: Request, res: Response) => {
    try{
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const posts = await Announcement.find()
        .populate("category","name")
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit);

        const total = await Announcement.countDocuments();
        const totalPages = Math.ceil(total / limit);
        
        res.status(200).json({
            message:"Announcements fetched successfully in welcome page",
            data:posts,
            page,
            totalPages,
            totalAnnouncements: total
        })
    }catch(error:any){
        res.status(500).json({
            message:"Error in Fetching announcements in welcome page",
            error: error?.message
        })
    }
}