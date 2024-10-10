import { Model, model, Schema } from "mongoose";
import { Order } from "../../types";

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    books: [
        {
            book: {
                type: Schema.Types.ObjectId,
                ref: 'book',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    delivery_method: {
        type: String,
        enum: ['courier', 'pickup', 'postal'],
        required: true
    },
    payment_method: {
        type: String,
        enum: ['payme', 'click', 'cash'],
        required: true
    },
    billingAddress: {
        region: {
            type: Schema.Types.ObjectId,
            ref:'region',
            required: true
        },
        district: {
            type: Schema.Types.ObjectId,
            ref: 'district',
            required: true
        },
        extraAddress: {
            type: String,
            required: true,
        }
    },
    extra_note: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'delivered', 'canceled'],
        default: 'pending'
    },
    price: {
        type: Number,
        required: true,
        default: 0
    }
},{
    timestamps: true,
})

const OrderModel: Model<Order> = model<Order>('order', OrderSchema)

export default OrderModel