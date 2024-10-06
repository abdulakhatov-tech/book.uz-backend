import { model, Model, Schema } from "mongoose";
import { DisrictI } from "../../../types";

const DistrictSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  region: {
    type: Schema.Types.ObjectId,
    ref: "region",
    required: true,
  },
});

const DistrictModel: Model<DisrictI> = model<DisrictI>(
  "district",
  DistrictSchema
);

export default DistrictModel;
