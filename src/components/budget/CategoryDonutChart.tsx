import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899'];

type CategoryData = {
  name: string;
  value: number; // spent amount
};

export default function CategoryDonutChart({ data }: { data: CategoryData[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="h-80 w-full bg-white rounded-2xl border shadow-sm p-5">
      <h3 className="text-lg font-semibold mb-2">Spending by Category</h3>
      
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          
          <Tooltip 
            formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
          />
          
          {/* Center Total */}
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
            <tspan x="50%" dy="-10" className="text-2xl font-bold fill-gray-800">
              ₹{total.toLocaleString('en-IN')}
            </tspan>
            <tspan x="50%" dy="20" className="text-sm fill-gray-500">
              Total Spent
            </tspan>
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}