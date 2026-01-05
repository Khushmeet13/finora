import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";

// Replace these with your actual variables
const totalIncome = 80000;      // totalMonthlyIncome
const totalExpenses = 57600;    // total monthly expenses
const savings = totalIncome - totalExpenses;
const savingsRate = totalIncome > 0 ? ((savings / totalIncome) * 100).toFixed(1) : "0";

const isPositive = savings >= 0;

const data = [
  { name: "Income", amount: totalIncome, fill: "#22c55e" },
  { name: "Expenses", amount: totalExpenses, fill: "#ef4444" },
  { name: "Savings", amount: Math.abs(savings), fill: isPositive ? "#c57147" : "#ef4444" },
];

export default function IncomeVsExpensesComparison() {
  return (
    <Card className="relative overflow-hidden shadow-xl bg-card/80 backdrop-blur-md border-0">
      {/* Subtle tri-color gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-primary/5 to-red-500/5" />

      <CardHeader className="relative pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-2xl font-bold">
            <div className="p-2 rounded-xl bg-primary/10">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            Income vs Expenses
          </CardTitle>

          {/* Quick Status Badge */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isPositive ? "bg-green-500/10" : "bg-red-500/10"}`}>
            {isPositive ? (
              <TrendingUp className="h-5 w-5 text-green-600" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-600" />
            )}
            <span className={`font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
              {isPositive ? "Surplus" : "Deficit"}
            </span>
          </div>
        </div>
        <p className="text-muted-foreground mt-2">
          Compare your earnings and spending for this month
        </p>
      </CardHeader>

      <CardContent className="relative">
        {/* Bar Chart */}
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" opacity={0.4} />
            
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 14, fontWeight: 600 }}
              stroke="#888"
            />
            
            <YAxis 
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              tick={{ fontSize: 12 }}
              stroke="#888"
            />
            
            <Tooltip 
              formatter={(value: number) => `₹${value.toLocaleString()}`}
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            />
            
            <Bar dataKey="amount" radius={[12, 12, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Highlight Section */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-emerald-500/10 border-2 border-primary/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {isPositive ? (
                <PiggyBank className="h-14 w-14 text-primary" />
              ) : (
                <TrendingDown className="h-14 w-14 text-red-600" />
              )}
              <div>
                <p className="text-sm uppercase tracking-wider text-muted-foreground">
                  {isPositive ? "You Saved" : "You Overspent"}
                </p>
                <p className={`text-4xl font-extrabold mt-1 ${isPositive ? "text-primary" : "text-red-600"}`}>
                  ₹{Math.abs(savings).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="text-center sm:text-right">
              <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-full text-2xl font-bold ${
                isPositive ? "bg-primary/20 text-primary" : "bg-red-500/20 text-red-600"
              }`}>
                <span>{savingsRate}%</span>
                <span className="text-sm font-normal text-muted-foreground">
                  of your income
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {isPositive
                  ? "🎉 Great job! You're building positive savings this month."
                  : "💡 Consider reviewing expenses to get back on track."}
              </p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-green-500" />
            <span>Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-red-500" />
            <span>Expenses</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full" style={{ backgroundColor: "#c57147" }} />
            <span>Savings (Income − Expenses)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}