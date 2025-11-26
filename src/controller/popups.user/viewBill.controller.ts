import { Response } from "express";
import { AuthRequest } from "../../middleware/auth";
import { Warranty } from "../../model/Warranty";

export const viewWarranty = async (req: AuthRequest, res: Response) => {
    try {
        const warrantyId = req.params.id;

        // Find warranty with category + brand populated
        const warranty = await Warranty.findById(warrantyId)
            .populate("category", "name")
            .populate("brandId", "name");

        if (!warranty) {
            return res.status(404).json({
                message: "Warranty not found",
            });
        }

        res.status(200).json({
            message: "Warranty loaded successfully",
            data: {
                ...warranty.toObject(),
                bill_image_url: warranty.bill_image  // cloudinary URL
            }
        });

    } catch (error: any) {
        res.status(500).json({
            message: "Error loading warranty",
            error: error.message
        });
    }
};
