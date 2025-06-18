export default function AppTable({ data }: { data: any[] }) {
  return (
    <div className="mt-6 bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['Name', 'Email', 'Amount', 'Purpose', 'Status'].map((h) => (
              <th
                key={h}
                className="px-6 py-3 text-left text-xs font-medium uppercase text-textSecondary"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-textPrimary">{row.name}</td>
              <td className="px-6 py-4 text-sm text-textPrimary">{row.email}</td>
              <td className="px-6 py-4 text-sm text-textPrimary">₹{row.loanAmount}</td>
              <td className="px-6 py-4 text-sm text-textPrimary">{row.purpose}</td>
              <td className="px-6 py-4 text-sm font-medium text-primary-500">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
