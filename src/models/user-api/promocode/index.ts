import { model, Model, Schema } from "mongoose";
import { PromocodeI } from "../../../types";

const PromocodeSchema = new Schema({
    couponCode: {
        type: String,
        required: true,
        unique: true
    },
    discount: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
})

const PromocodeModel: Model<PromocodeI> = model<PromocodeI>('coupon-Code', PromocodeSchema)

export default PromocodeModel;