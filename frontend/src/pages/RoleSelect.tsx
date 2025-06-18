import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoleSelect() {
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const nav = useNavigate();

  const start = () => {
    // save to localStorage
    localStorage.setItem('role', role);
    if (role === 'user') localStorage.setItem('email', email);
    nav(`/dashboard/${role}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <h2 className="text-2xl font-semibold">Select Your Role</h2>
      <select
        value={role}
        onChange={e => setRole(e.target.value)}
        className="px-4 py-2 rounded border"
      >
        <option value="user">User</option>
        <option value="verifier">Verifier</option>
        <option value="admin">Admin</option>
      </select>
      {role === 'user' && (
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="px-4 py-2 rounded border"
        />
      )}
      <button onClick={start} className="btn-primary">
        Go to Dashboard
      </button>
    </div>
  );
}
