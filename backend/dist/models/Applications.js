"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/models/Application.ts
const mongoose_1 = __importDefault(require("mongoose"));
const applicationSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    loanAmount: { type: Number, required: true },
    purpose: { type: String, required: true },
    status: { type: String, default: 'Pending' }, // Pending/Approved/Rejected
    createdAt: { type: Date, default: Date.now },
    // New financial fields:
    disbursedAmount: { type: Number, default: 0 },
    receivedAmount: { type: Number, default: 0 },
    savings: { type: Number, default: 0 },
    repaid: { type: Boolean, default: false },
    otherAccounts: { type: Number, default: 0 }
});
exports.default = mongoose_1.default.model('Application', applicationSchema);
