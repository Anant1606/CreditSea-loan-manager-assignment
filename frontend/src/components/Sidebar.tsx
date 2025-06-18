import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  const links = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Form', to: '/form' }
  ];

  return (
    <aside className="sidebar">
      <h1>CreditSea 🌊</h1>
      <nav>
        <ul>
          {links.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive ? 'active' : ''
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
