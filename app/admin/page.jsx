import { Home, Users, Building2, Eye } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Properties', value: '124', icon: Home, color: 'text-blue-500' },
    { title: 'Active Users', value: '89', icon: Users, color: 'text-green-500' },
    { title: 'Communities', value: '12', icon: Building2, color: 'text-purple-500' },
    { title: 'Page Views (30d)', value: '45.2k', icon: Eye, color: 'text-orange-500' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-neutral-800 mb-8">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 flex items-center">
            <div className={`p-4 rounded-full bg-neutral-100 ${stat.color} mr-4`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-neutral-500 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-neutral-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <h3 className="text-lg font-bold text-neutral-800 mb-4">Recent Activity</h3>
        <p className="text-neutral-500 text-sm">Dashboard content will be populated from the database here...</p>
      </div>
    </div>
  );
}
