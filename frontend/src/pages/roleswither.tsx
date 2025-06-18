// src/components/RoleSwitcher.tsx
import { useNavigate } from 'react-router-dom';

export default function RoleSwitcher() {
  const nav = useNavigate();
  const role = localStorage.getItem('role') || 'user';
  const email = localStorage.getItem('email') || '';

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    localStorage.setItem('role', newRole);
    if (newRole === 'user') {
      // prompt for new email if you want, or keep existing
      localStorage.setItem('email', email);
    }
    nav(`/dashboard/${newRole}`);
  };

  return (
    <select
      value={role}
      onChange={onChange}
      className="px-2 py-1 border rounded"
    >
      <option value="admin">Admin</option>
      <option value="verifier">Verifier</option>
      <option value="user">User</option>
    </select>
  );
}
