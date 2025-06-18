import { Request, Response } from 'express';
import Application from '../models/Applications';

export const submitApplication = async (req: Request, res: Response) => {
  try {
    const newApp = await Application.create(req.body);
    res.status(201).json(newApp);
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit application' });
  }
};

export const getAllApplications = async (_req: Request, res: Response) => {
  try {
    const apps = await Application.find();
    res.status(200).json(apps);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};

export const getDashboardStats = async (_req: Request, res: Response) => {
  try {
    const apps = await Application.find();
    const total = apps.length;
    const approved = apps.filter(app => app.status === 'Approved').length;
    const rejected = apps.filter(app => app.status === 'Rejected').length;
    const pending = total - approved - rejected;
    const totalLoanAmount = apps.reduce((sum, app) => sum + app.loanAmount, 0);
    res.status(200).json({ total, approved, rejected, pending, totalLoanAmount });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get stats' });
  }
};
