// src/pages/UserDashboard.tsx
import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import RecentLoansTable from '../components/RecentLoanTable';
import { api } from '../api';

export default function UserDashboard() {
  const [stats, setStats] = useState<any>(null);
  const email = localStorage.getItem('email')!;
  
  useEffect(() => {
    api.get('/stats/user', { params: { email } }).then(r => setStats(r.data));
  }, [email]);
  if (!stats) return <p>Loading…</p>;

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard label="Total Borrowed"  value={`₹ ${stats.totalBorrowed}`} />
        <StatCard label="Total Disbursed" value={`₹ ${stats.totalDisbursed}`} />
        <StatCard label="Total Received"  value={`₹ ${stats.totalReceived}`} />
      </div>
      <RecentLoansTable loans={stats.recentLoans} />
    </>
  );
}
