import mongoose, { Schema } from "mongoose";

export interface IBrand extends Document{
    _id: mongoose.Types.ObjectId;
    category: mongoose.Types.ObjectId;
    brand_name: string;
    createdAt: Date;
    updatedAt?: Date;
}

const brandSchema = new Schema<IBrand>({
    category: {type: mongoose.Types.ObjectId, ref: 'Category'},
    brand_name: {type: String},
},{
    timestamps: true

});

export const Brand = mongoose.model<IBrand>("Brand", brandSchema)