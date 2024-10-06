"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RegionSchema = new mongoose_1.Schema({
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
const RegionModel = (0, mongoose_1.model)("region", RegionSchema);
exports.default = RegionModel;
