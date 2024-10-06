import { Model, model, Schema } from "mongoose";
import { DeliveryMethodI } from "../../../types";

const DeliveryMethodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["courier", "pickup", "postal"], 
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
},{
    timestamps: true, 
  
});

const DeliveryMethodModel: Model<DeliveryMethodI> = model<DeliveryMethodI>('delivery-method', DeliveryMethodSchema)

export default DeliveryMethodModel;
