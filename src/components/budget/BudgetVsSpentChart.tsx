import { BarChart, Bar, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function BudgetVsSpentChart({ categories }: { categories: any[] }) {
  const chartData = categories.map(cat => ({
    name: cat.name.split(' ')[0], // short name
    Budget: cat.allocated,
    Spent: cat.spent
  }));

  return (
    <div className="h-[360px] w-full bg-white rounded-lg border shadow-md p-5">
      <h3 className="text-lg font-semibold mb-2 tracking-tight">Budget vs Actual Spending</h3>
      
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.6} />
          {/* <XAxis dataKey="name" angle={-25} textAnchor="end" height={60} /> */}
          <YAxis tickFormatter={(value) => `₹${(value/1000)}k`} />
          
          <Tooltip 
            formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
            labelStyle={{ fontWeight: 'bold' }}
          />
          
          <Legend verticalAlign="top" height={36} />
          
          <Bar dataKey="Budget" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Spent" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}