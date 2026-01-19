import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function MonthlyTrendChart({ monthlyData }: { monthlyData: number[] }) {  // array of spent amounts last 6 months
  const data = monthlyData.map((spent, i) => ({
    month: months[i],
    Spent: spent,
    Budget: 20000 // assuming fixed monthly budget
  }));

  return (
    <div className="h-80 w-full bg-white rounded-2xl border shadow-sm p-5">
      <h3 className="text-lg font-semibold mb-2">Spending Trend (Last 6 Months)</h3>
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `₹${(value/1000)}k`} />
          
          <Tooltip 
            formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
          />
          
          <Line 
            type="monotone" 
            dataKey="Budget" 
            stroke="#64748b" 
            strokeDasharray="5 5" 
            dot={false}
            name="Monthly Budget"
          />
          <Line 
            type="monotone" 
            dataKey="Spent" 
            stroke="#10b981" 
            strokeWidth={2.5}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
            name="Actual Spending"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}