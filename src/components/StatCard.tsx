import { Card, CardContent } from "../components/ui/card";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell
} from "recharts";


interface StatCardProps {
  title: string;
  value: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  chartType?: "area" | "bar" | "ring";
  chartData?: any[];
  ringValue?: number;
  variant?: "default" | "success" | "warning" | "destructive";
}

const chartColors = {
  success: "hsl(142 76% 36%)",     // green
  destructive: "hsl(0 72% 51%)",   // red
  warning: "hsl(38 92% 50%)",
  default: "hsl(197 71% 45%)"      // blue
};

const chartColor = "hsl(197 71% 45%)";


export function StatCard({
  title,
  value,
  trend,
  chartType = "area",
  chartData = [],
  ringValue,
  variant = "default",
}: StatCardProps) {
  const variantStyles = {
    default: "from-primary/10 to-primary/5",
    success: "from-success/10 to-success/5",
    warning: "from-warning/10 to-warning/5",
    destructive: "from-destructive/10 to-destructive/5",
  };

  return (
    <Link to={
      title === "Total Income" ? "/insights/income" :
        title === "Total Spent" ? "/insights/expense" :
          title === "Remaining Budget" ? "/insights/budget" :
            title === "Transactions" ? "/transactions" :
              "#"
    }>
      <Card
        className={`
        group relative overflow-hidden border-none 
        bg-gradient-to-br ${variantStyles[variant]} 
        transition-all duration-300 
        hover:-translate-y-1 hover:shadow-xl 
        hover:bg-background/40 backdrop-blur-md pb-3
        cursor-pointer active:scale-[0.98]
      `}
      >

        {/* Glow Border */}
        <span
          className="absolute inset-0 rounded-xl  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Shine Effect */}
        <span
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent 
        group-hover:translate-x-full transition-transform duration-700"
        />

        <CardContent className="p-6 px-4 relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {title}
              </p>
              <p className="text-3xl font-bold text-foreground">{value}</p>

              {trend && (
                <p
                  className={`text-xs mt-2 ${trend.isPositive ? "text-success" : "text-destructive"
                    }`}
                >
                  {trend.isPositive ? "↑" : "↓"} {trend.value}
                </p>
              )}

              {/* Hidden Insight Text */}
              <div className="relative h-0">
                <p
                  className="
                  text-xs text-muted-foreground 
                  absolute left-0 top-2 mb-2
                  opacity-0 translate-y-2 
                  group-hover:opacity-100 group-hover:translate-y-0 
                  transition-all duration-300
                  pointer-events-none
                "
                >
                  View detailed insights →
                </p>
              </div>

            </div>

            {/* Mini Chart */}
            <div className="w-32 h-20 -mr-2">
              {chartType === "area" && chartData.length > 0 && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id={`areaGradient-${variant}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartColors[variant]} stopOpacity={0.4} />
                        <stop offset="95%" stopColor={chartColors[variant]} stopOpacity={0} />
                      </linearGradient>
                    </defs>

                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={chartColors[variant]}
                      strokeWidth={1}
                      fill={`url(#areaGradient-${variant})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}



              {chartType === "bar" && chartData.length > 0 && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 0, bottom: 0, left: 10 }}
                  >
                    <Bar
                      dataKey="value"
                      radius={[4, 4, 0, 0]}
                       barSize={15}
                  
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill || "hsl(197 71% 45%)"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}

              {chartType === "ring" && ringValue !== undefined && (
                <div className="relative w-20 h-20 mx-auto">
                  <svg className="w-20 h-20 -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="34"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                      fill="none"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="34"
                      stroke={chartColor}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${ringValue * 2.13} 213`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-md font-semibold text-gray-900">{ringValue}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
