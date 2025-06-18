// src/pages/AdminDashboard.tsx
import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import RecentLoansTable from '../components/RecentLoanTable';
import { api } from '../api';
import './AdminDshboard.css';


export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get('/stats/admin').then(r => setStats(r.data));
  }, []);

  if (!stats) return <p>Loading…</p>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="stats-grid">
        <StatCard label="Active Users"    value={stats.activeUsers} />
        <StatCard label="Borrowers"       value={stats.borrowers} />
        <StatCard label="Cash Disbursed"  value={`₹ ${stats.cashDisbursed}`} />
        <StatCard label="Cash Received"   value={`₹ ${stats.cashReceived}`} />
        <StatCard label="Savings"         value={`₹ ${stats.totalSavings}`} />
        <StatCard label="Repaid Loans"    value={stats.repaidLoans} />
        <StatCard label="Other Accounts"  value={stats.otherAccounts} />
        <StatCard label="Total Loans"     value={stats.totalLoans} />
      </div>
      <div className="recent-loans">
        <RecentLoansTable loans={stats.recentLoans} />
      </div>
    </div>
  );
}
