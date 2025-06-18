interface StatCardProps {
  label: string;
  value: number | string;
}

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between">
      <p className="text-sm text-textSecondary">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-primary-600">{value}</p>
    </div>
  );
}
