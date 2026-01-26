import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#10b981", // Food
  "#3b82f6", // Rent
  "#8b5cf6", // Shopping
  "#f59e0b", // Transport
  "#ef4444", // Entertainment
  "#ec4899", // Others
];

type CategoryData = {
  name: string;
  value: number;
};

const renderLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  name,
  fill,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 20;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={fill}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-sm font-medium"
    >
      {name} {(percent * 100).toFixed(0)}%
    </text>
  );
};

export default function CategoryDonutChart({
  data,
}: {
  data: CategoryData[];
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="h-[360px] w-full bg-white rounded-lg border shadow-md p-5">
      <h3 className="text-lg font-semibold mb-2 tracking-tight">
        Spending by Category
      </h3>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
            dataKey="value"
            nameKey="name"
            label={renderLabel}
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          {/* Center text */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            <tspan
              x="50%"
              dy="-8"
              className="text-2xl font-bold fill-gray-900"
            >
              ₹{total.toLocaleString("en-IN")}
            </tspan>
            <tspan
              x="50%"
              dy="20"
              className="text-sm fill-gray-500"
            >
              Total Spent
            </tspan>
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
