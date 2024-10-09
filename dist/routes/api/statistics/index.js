"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const statistics_1 = require("../../../controller/statistics");
const router = (0, express_1.Router)();
router.get('/', statistics_1.getStatistics);
exports.default = router;
