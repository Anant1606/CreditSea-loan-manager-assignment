import { useEffect, useState } from 'react';
import axios from 'axios';
import StatCard from '../components/StatCard';
import AppTable from '../components/AppTable';

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    totalLoanAmount: 0
  });
  const [apps, setApps] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/applications/stats').then((res) => setStats(res.data));
    axios.get('http://localhost:5000/api/applications').then((res) => setApps(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-textPrimary mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Applications" value={stats.total} />
        <StatCard label="Approved" value={stats.approved} />
        <StatCard label="Rejected" value={stats.rejected} />
        <StatCard label="Pending" value={stats.pending} />
        <StatCard label="Total Loan Amount" value={`₹ ${stats.totalLoanAmount}`} />
      </div>

      {/* Chart Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="h-64 bg-gray-100 rounded-xl" />
        <div className="h-64 bg-gray-100 rounded-xl" />
      </div>

      {/* Applications Table */}
      <AppTable data={apps} />
    </div>
  );
}
