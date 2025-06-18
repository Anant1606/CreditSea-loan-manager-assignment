import { Request, Response } from 'express';
import Application from '../models/Applications';
// Helper to parse role & (for user) email from query
const getRole = (req: Request) => req.query.role as string || 'user';
const getEmail = (req: Request) => req.query.email as string || '';


export const submitApplication = async (req: Request, res: Response) => {
  try {
    const newApp = await Application.create(req.body);
    res.status(201).json(newApp);
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit application' });
  }
};

export const getApplications = async (req: Request, res: Response) => {
  try {
    const role = getRole(req);
    let apps;
    if (role === 'admin') {
      apps = await Application.find();
    } else if (role === 'verifier') {
      apps = await Application.find({ status: 'Pending' });
    } else {
      // user
      const email = getEmail(req);
      apps = await Application.find({ email });
    }
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const role = getRole(req);
    let apps = await Application.find();
    if (role === 'verifier') {
      apps = apps.filter(a => a.status === 'Pending');
    } else if (role === 'user') {
      const email = getEmail(req);
      apps = apps.filter(a => a.email === email);
    }
    const total = apps.length;
    const approved = apps.filter(a => a.status === 'Approved').length;
    const rejected = apps.filter(a => a.status === 'Rejected').length;
    const pending = total - approved - rejected;
    const totalLoanAmount = apps.reduce((sum, a) => sum + a.loanAmount, 0);
    res.json({ total, approved, rejected, pending, totalLoanAmount });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get stats' });
  }
};
// ADMIN stats
export const getAdminStats = async (_req: Request, res: Response) => {
  const apps = await Application.find();
  const activeUsers     = new Set(apps.map(a => a.email)).size;
  const borrowers       = apps.length;
  const cashDisbursed   = apps.reduce((s, a) => s + a.disbursedAmount, 0);
  const cashReceived    = apps.reduce((s, a) => s + a.receivedAmount, 0);
  const totalSavings    = apps.reduce((s, a) => s + a.savings, 0);
  const repaidLoans     = apps.filter(a => a.repaid).length;
  const otherAccounts   = apps.reduce((s, a) => s + a.otherAccounts, 0);
  const totalLoans      = apps.length;

  const recentLoans = await Application.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .select('name email loanAmount status createdAt');
  
  res.json({
    activeUsers, borrowers, cashDisbursed, cashReceived,
    totalSavings, repaidLoans, otherAccounts, totalLoans,
    recentLoans
  });
};

// VERIFIER stats (only “Pending” loans)
export const getVerifierStats = async (_req: Request, res: Response) => {
  const apps = await Application.find({ status: 'Pending' });
  const borrowers     = apps.length;
  const cashDisbursed = apps.reduce((s, a) => s + a.disbursedAmount, 0);
  const cashReceived  = apps.reduce((s, a) => s + a.receivedAmount, 0);
  const totalSavings  = apps.reduce((s, a) => s + a.savings, 0);
  const repaidLoans   = apps.filter(a => a.repaid).length;
  const totalLoans    = apps.length;

  const recentLoans = await Application.find({ status: 'Pending' })
    .sort({ createdAt: -1 })
    .limit(10)
    .select('name email loanAmount status createdAt');
  
  res.json({
    borrowers, cashDisbursed, cashReceived,
    totalSavings, repaidLoans, totalLoans,
    recentLoans
  });
};

// USER stats (only for a single email)
export const getUserStats = async (req: Request, res: Response) => {
  const email = req.query.email as string;
  const apps = await Application.find({ email });
  
  const totalBorrowed  = apps.reduce((s, a) => s + a.loanAmount, 0);
  const totalDisbursed = apps.reduce((s, a) => s + a.disbursedAmount, 0);
  const totalReceived  = apps.reduce((s, a) => s + a.receivedAmount, 0);
  
  const recentLoans = apps
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 10)
    .map(a => ({
      loanAmount: a.loanAmount,
      status: a.status,
      createdAt: a.createdAt
    }));

  res.json({ totalBorrowed, totalDisbursed, totalReceived, recentLoans });
};
