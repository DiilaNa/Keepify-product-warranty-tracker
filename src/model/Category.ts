import mongoose, { Schema } from "mongoose";

export interface ICategory extends Document{
    _id: mongoose.Types.ObjectId;
    name: string;
    image_url: string;
    createdAt: Date;
    updatedAt?: Date;
}

const categorySchema = new Schema<ICategory>({
    name: {type: String},
    image_url: {type: String},
},  
{
    timestamps: true
}
)

export const Category = mongoose.model<ICategory>("Category", categorySchema)