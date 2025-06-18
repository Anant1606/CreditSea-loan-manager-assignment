// src/pages/VerifierDashboard.tsx
import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import RecentLoansTable from '../components/RecentLoansTable';
import { api } from '../api';

export default function VerifierDashboard() {
  const [stats, setStats] = useState<any>(null);
  useEffect(() => {
    api.get('/stats/verifier').then(r => setStats(r.data));
  }, []);
  if (!stats) return <p>Loading…</p>;

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Verifier Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard label="Borrowers"      value={stats.borrowers} />
        <StatCard label="Cash Disbursed" value={`₹ ${stats.cashDisbursed}`} />
        <StatCard label="Cash Received"  value={`₹ ${stats.cashReceived}`} />
        <StatCard label="Savings"        value={`₹ ${stats.totalSavings}`} />
        <StatCard label="Repaid Loans"   value={stats.repaidLoans} />
        <StatCard label="Total Loans"    value={stats.totalLoans} />
      </div>
      <RecentLoansTable loans={stats.recentLoans} isVerifier />
    </>
  );
}
