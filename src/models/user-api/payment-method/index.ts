import { Model, model, Schema } from "mongoose";
import { PaymentMethodI } from "../../../types";

const PaymentMethodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["payme", "cash", "click"], 
    required: true,
  },
},
{
  timestamps: true,  
});

const PaymentMethodModel: Model<PaymentMethodI> = model<PaymentMethodI>('payment-method', PaymentMethodSchema)

export default PaymentMethodModel;
