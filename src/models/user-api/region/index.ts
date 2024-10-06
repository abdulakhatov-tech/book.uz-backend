import { Model, model, Schema } from "mongoose";
import { RegionI } from "../../../types";

const RegionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  paymentTypes: {
    type: [String],
    enum: ["balance", "card", "cash"],
    required: true,
  }
});

const RegionModel: Model<RegionI> = model<RegionI>("region", RegionSchema);

export default RegionModel;