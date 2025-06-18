"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/applicationRoutes.ts
const express_1 = __importDefault(require("express"));
const applicationsControllers_1 = require("../controllers/applicationsControllers");
const router = express_1.default.Router();
router.post('/', applicationsControllers_1.submitApplication);
router.get('/', applicationsControllers_1.getApplications);
router.get('/stats', applicationsControllers_1.getDashboardStats);
// Role‑specific stat endpoints:
router.get('/stats/admin', applicationsControllers_1.getAdminStats);
router.get('/stats/verifier', applicationsControllers_1.getVerifierStats);
router.get('/stats/user', applicationsControllers_1.getUserStats);
exports.default = router;
