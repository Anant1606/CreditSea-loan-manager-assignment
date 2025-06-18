import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Roleselect.css';

export default function RoleSelect() {
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const nav = useNavigate();

  const start = () => {
    localStorage.setItem('role', role);
    if (role === 'user') localStorage.setItem('email', email);
    nav(`/dashboard/${role}`);
  };

  return (
    <div className="role-select-container">
      <h2>Select Your Role</h2>

      <select value={role} onChange={e => setRole(e.target.value)}>
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
        />
      )}

      <button onClick={start}>Go to Dashboard</button>
    </div>
  );
}
