import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <input
        type="text"
        placeholder="Search..."
      />
      <div className="right-section">
        {/* Role switcher or other controls could go here */}
        <img
          src="/avatar.jpg"
          alt="User"
          className="avatar"
        />
        <span className="username">Anant Sharma</span>
      </div>
    </header>
  );
}
