import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import RecentLoansTable from '../components/RecentLoanTable';
import { api } from '../api';
import './UserDsh.css';

export default function UserDashboard() {
  const storedUser = localStorage.getItem('user');
  const initialEmail = storedUser ? JSON.parse(storedUser).email : '';

  const [email, setEmail] = useState(initialEmail);
  const [inputEmail, setInputEmail] = useState('');
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (email) {
      api.get('/stats/user', { params: { email } })
        .then(res => setStats(res.data))
        .catch(err => {
          console.error('Failed to fetch stats:', err);
        });
    }
  }, [email]);

  const handleEmailSubmit = () => {
    if (!inputEmail) return;
    localStorage.setItem('user', JSON.stringify({ email: inputEmail }));
    setEmail(inputEmail);
  };

  if (!email) {
    return (
      <div className="user-dashboard email-input-screen">
        <h2>Please enter your email to view dashboard</h2>
        <input
          type="email"
          value={inputEmail}
          onChange={e => setInputEmail(e.target.value)}
          placeholder="Enter your email"
          className="email-input"
        />
        <button onClick={handleEmailSubmit} className="submit-button">Submit</button>
      </div>
    );
  }

  if (!stats) return <p>Loading…</p>;

  return (
    <div className="user-dashboard">
      <h1>Your Dashboard</h1>
      <div className="stats-grid">
        <StatCard label="Total Borrowed"  value={`₹ ${stats.totalBorrowed}`} />
        <StatCard label="Total Disbursed" value={`₹ ${stats.totalDisbursed}`} />
        <StatCard label="Total Received"  value={`₹ ${stats.totalReceived}`} />
      </div>
      <div className="recent-loans">
        <RecentLoansTable loans={stats.recentLoans} />
      </div>
    </div>
  );
}
