import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import RecentLoansTable from '../components/RecentLoanTable';
import { api } from '../api';
import './verifierdasboar.css';

export default function VerifierDashboard() {
  const [stats, setStats] = useState<any>(null);
  useEffect(() => {
    api.get('/stats/verifier').then(r => setStats(r.data));
  }, []);
  if (!stats) return <p>Loading…</p>;

  return (
    <div className="verifier-dashboard">
      <h1>Verifier Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-label">Borrowers</div>
          <div className="stat-card-value">{stats.borrowers}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Cash Disbursed</div>
          <div className="stat-card-value">₹ {stats.cashDisbursed}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Cash Received</div>
          <div className="stat-card-value">₹ {stats.cashReceived}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Savings</div>
          <div className="stat-card-value">₹ {stats.totalSavings}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Repaid Loans</div>
          <div className="stat-card-value">{stats.repaidLoans}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Total Loans</div>
          <div className="stat-card-value">{stats.totalLoans}</div>
        </div>
      </div>

      <div className="recent-loans">
        <RecentLoansTable loans={stats.recentLoans} isVerifier />
      </div>
    </div>
  );
}
