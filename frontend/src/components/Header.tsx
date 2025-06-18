export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
      <input
        type="text"
        placeholder="Search..."
        className="px-4 py-2 rounded-lg border border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-300"
      />
      <div className="flex items-center space-x-3">
        <img src="/avatar.jpg" alt="User" className="w-8 h-8 rounded-full" />
        <span className="text-textPrimary font-medium">Anant Sharma</span>
      </div>
    </header>
  );
}
