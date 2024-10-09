"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const StatisticsSchema = new mongoose_1.Schema({
    totalBooks: {
        type: Number,
        default: 0,
        min: 0,
    },
    totalNamedBooks: {
        type: Number,
        default: 0,
        min: 0,
    },
    totalBranches: {
        type: Number,
        default: 0,
        min: 0,
    },
}, {
    timestamps: true,
});
const StatisticsModel = (0, mongoose_1.model)('statistics', StatisticsSchema);
exports.default = StatisticsModel;
