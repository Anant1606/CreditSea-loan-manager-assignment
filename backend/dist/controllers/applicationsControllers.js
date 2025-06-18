"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStats = exports.getVerifierStats = exports.getAdminStats = exports.getDashboardStats = exports.getApplications = exports.submitApplication = void 0;
const Applications_1 = __importDefault(require("../models/Applications"));
// Helper to parse role & (for user) email from query
const getRole = (req) => req.query.role || 'user';
const getEmail = (req) => req.query.email || '';
const submitApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newApp = yield Applications_1.default.create(req.body);
        res.status(201).json(newApp);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to submit application' });
    }
});
exports.submitApplication = submitApplication;
const getApplications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = getRole(req);
        let apps;
        if (role === 'admin') {
            apps = yield Applications_1.default.find();
        }
        else if (role === 'verifier') {
            apps = yield Applications_1.default.find({ status: 'Pending' });
        }
        else {
            // user
            const email = getEmail(req);
            apps = yield Applications_1.default.find({ email });
        }
        res.json(apps);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
});
exports.getApplications = getApplications;
const getDashboardStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = getRole(req);
        let apps = yield Applications_1.default.find();
        if (role === 'verifier') {
            apps = apps.filter(a => a.status === 'Pending');
        }
        else if (role === 'user') {
            const email = getEmail(req);
            apps = apps.filter(a => a.email === email);
        }
        const total = apps.length;
        const approved = apps.filter(a => a.status === 'Approved').length;
        const rejected = apps.filter(a => a.status === 'Rejected').length;
        const pending = total - approved - rejected;
        const totalLoanAmount = apps.reduce((sum, a) => sum + a.loanAmount, 0);
        res.json({ total, approved, rejected, pending, totalLoanAmount });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to get stats' });
    }
});
exports.getDashboardStats = getDashboardStats;
// ADMIN stats
const getAdminStats = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apps = yield Applications_1.default.find();
    const activeUsers = new Set(apps.map(a => a.email)).size;
    const borrowers = apps.length;
    const cashDisbursed = apps.reduce((s, a) => s + a.disbursedAmount, 0);
    const cashReceived = apps.reduce((s, a) => s + a.receivedAmount, 0);
    const totalSavings = apps.reduce((s, a) => s + a.savings, 0);
    const repaidLoans = apps.filter(a => a.repaid).length;
    const otherAccounts = apps.reduce((s, a) => s + a.otherAccounts, 0);
    const totalLoans = apps.length;
    const recentLoans = yield Applications_1.default.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .select('name email loanAmount status createdAt');
    res.json({
        activeUsers, borrowers, cashDisbursed, cashReceived,
        totalSavings, repaidLoans, otherAccounts, totalLoans,
        recentLoans
    });
});
exports.getAdminStats = getAdminStats;
// VERIFIER stats (only “Pending” loans)
const getVerifierStats = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apps = yield Applications_1.default.find({ status: 'Pending' });
    const borrowers = apps.length;
    const cashDisbursed = apps.reduce((s, a) => s + a.disbursedAmount, 0);
    const cashReceived = apps.reduce((s, a) => s + a.receivedAmount, 0);
    const totalSavings = apps.reduce((s, a) => s + a.savings, 0);
    const repaidLoans = apps.filter(a => a.repaid).length;
    const totalLoans = apps.length;
    const recentLoans = yield Applications_1.default.find({ status: 'Pending' })
        .sort({ createdAt: -1 })
        .limit(10)
        .select('name email loanAmount status createdAt');
    res.json({
        borrowers, cashDisbursed, cashReceived,
        totalSavings, repaidLoans, totalLoans,
        recentLoans
    });
});
exports.getVerifierStats = getVerifierStats;
// USER stats (only for a single email)
const getUserStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    const apps = yield Applications_1.default.find({ email });
    const totalBorrowed = apps.reduce((s, a) => s + a.loanAmount, 0);
    const totalDisbursed = apps.reduce((s, a) => s + a.disbursedAmount, 0);
    const totalReceived = apps.reduce((s, a) => s + a.receivedAmount, 0);
    const recentLoans = apps
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 10)
        .map(a => ({
        loanAmount: a.loanAmount,
        status: a.status,
        createdAt: a.createdAt
    }));
    res.json({ totalBorrowed, totalDisbursed, totalReceived, recentLoans });
});
exports.getUserStats = getUserStats;
