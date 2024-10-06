"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DistrictSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    region: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "region",
        required: true,
    },
});
const DistrictModel = (0, mongoose_1.model)("district", DistrictSchema);
exports.default = DistrictModel;
