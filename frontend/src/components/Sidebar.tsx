import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const links = [
    { label: 'Form', to: '/form' },
    { label: 'Dashboard', to: '/dashboard' }
  ];
  return (
    <aside className="w-64 bg-white shadow-md flex flex-col p-6 space-y-8">
      <h1 className="text-2xl font-bold text-textPrimary">CreditSea</h1>
      <nav className="flex-1">
        <ul className="space-y-4">
          {links.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg ${
                    isActive
                      ? 'bg-primary-500 text-white'
                      : 'text-textSecondary hover:bg-primary-50'
                  }`
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
