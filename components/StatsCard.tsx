import Link from 'next/link'

interface StatsCardProps {
  title: string;
  count: number;
  icon: string;
  href: string;
  color: string;
}

export default function StatsCard({ title, count, icon, href, color }: StatsCardProps) {
  return (
    <Link href={href} className="dashboard-card p-6 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{count}</p>
        </div>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${color} transition-transform duration-200 group-hover:scale-110`}
        >
          {icon}
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-4 group-hover:text-brand-600 transition-colors">
        View all →
      </p>
    </Link>
  )
}