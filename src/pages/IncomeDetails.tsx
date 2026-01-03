import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ArrowLeft,
  TrendingUp,
  Wallet,
  Briefcase,
  PiggyBank,
  CreditCard,
  Plus,
  Download,
  Bell,
  IndianRupee,
  Calendar,
  Info,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ================= DUMMY DATA ================= */
const monthlyTrend = [
  { month: "Jul", total: 75000, salary: 60000, freelance: 12000, other: 3000 },
  { month: "Aug", total: 82000, salary: 60000, freelance: 18000, other: 4000 },
  { month: "Sep", total: 88000, salary: 60000, freelance: 22000, other: 6000 },
  { month: "Oct", total: 92000, salary: 65000, freelance: 20000, other: 7000 },
  { month: "Nov", total: 95000, salary: 65000, freelance: 24000, other: 6000 },
  { month: "Dec", total: 102000, salary: 70000, freelance: 25000, other: 7000 },
];

const salaryBreakdown = [
  { label: "Basic Pay", amount: 35000, percentage: 50 },
  { label: "HRA", amount: 14000, percentage: 20 },
  { label: "Special Allowance", amount: 14000, percentage: 20 },
  { label: "Performance Bonus", amount: 7000, percentage: 10 },
];

const deductions = [
  { label: "Income Tax (TDS)", amount: 8000, percentage: 11.4 },
  { label: "EPF (Employee)", amount: 4200, percentage: 6 },
  { label: "Professional Tax", amount: 200, percentage: 0.3 },
  { label: "Insurance", amount: 1600, percentage: 2.3 },
];

const incomeSources = [
  { name: "Full-time Salary", amount: 70000, frequency: "Monthly", status: "active" },
  { name: "Freelance Projects", amount: 25000, frequency: "Irregular", status: "active" },
  { name: "Stock Dividends", amount: 5000, frequency: "Quarterly", status: "active" },
  { name: "Rental Income", amount: 2000, frequency: "Monthly", status: "inactive" },
];

const COLORS = ["#22c55e", "#3b82f6", "#8b5cf6", "#f59e0b"];
const PIE_COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];

/* ================= CALCULATIONS ================= */
const grossSalary = salaryBreakdown.reduce((sum, item) => sum + item.amount, 0);
const totalDeductions = deductions.reduce((sum, item) => sum + item.amount, 0);
const netSalary = grossSalary - totalDeductions;
const totalOtherIncome = incomeSources.slice(1).reduce((sum, s) => sum + s.amount, 0);
const totalMonthlyIncome = grossSalary + totalOtherIncome;
const growthRate = "+12.6%";

export default function IncomeDetails() {
  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="max-w-8xl mx-auto  space-y-10">
        {/* ================= HEADER ================= */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <button className="p-3 rounded-md bg-card hover:bg-muted transition-shadow shadow-sm">
              <ArrowLeft className="h-4 w-4" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Income Overview</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Track your earnings, sources, and growth at a glance
            </p>
          </div>
        </div>

        {/* ================= TOP SUMMARY CARDS ================= */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: "Total Monthly Income", value: `₹${totalMonthlyIncome.toLocaleString()}`, icon: Wallet, color: "text-green-600" },
            { label: "Primary Salary (Net)", value: `₹${netSalary.toLocaleString()}`, icon: Briefcase, color: "text-blue-600" },
            { label: "Other Income", value: `₹${totalOtherIncome.toLocaleString()}`, icon: PiggyBank, color: "text-purple-600" },
            { label: "Growth vs Last Month", value: growthRate, icon: TrendingUp, color: "text-emerald-600" },
            { label: "Deductions", value: `₹${totalDeductions.toLocaleString()}`, icon: CreditCard, color: "text-red-600" },
          ].map((stat) => (
            <Card key={stat.label} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-4 rounded-2xl bg-${stat.color.slice(5)}/10`}>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ================= INSIGHTS BANNER ================= */}
        <Card className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-0 shadow-md">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/20">
                <Info className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Smart Insights</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Your income grew by <span className="font-bold text-emerald-600">{growthRate}</span> this month</li>
                  <li>• Freelance now contributes <span className="font-bold text-blue-600">24.5%</span> of total income</li>
                  <li>• Only <span className="font-bold text-red-600">18%</span> of gross salary goes to deductions — better than average!</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ================= SALARY BREAKDOWN + DEDUCTIONS ================= */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Salary Structure */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IndianRupee className="h-5 w-5" />
                Salary Breakdown (Gross: ₹{grossSalary.toLocaleString()})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {salaryBreakdown.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.label}</span>
                    <span className="font-medium">₹{item.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t">
                <div className="flex justify-between font-bold text-lg">
                  <span>Net Salary (In-hand)</span>
                  <span className="text-green-600">₹{netSalary.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deductions */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Deductions ({((totalDeductions / grossSalary) * 100).toFixed(1)}% of Gross)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {deductions.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.label}</span>
                    <span className="font-medium text-red-600">-₹{item.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-red-500 h-3 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* ================= MONTHLY TREND + SOURCES ================= */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Month-wise Income Trend */}
          <Card className="lg:col-span-2 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Month-wise Income Trend (Last 6 Months)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                  <Bar dataKey="salary" stackId="a" fill="#22c55e" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="freelance" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="other" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Income Sources Pie */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Income Sources Split</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={incomeSources}
                    dataKey="amount"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                  >
                    {incomeSources.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-6 space-y-3">
                {incomeSources.map((source, i) => (
                  <div key={source.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                      <div>
                        <p className="font-medium">{source.name}</p>
                        <p className="text-xs text-muted-foreground">{source.frequency}</p>
                      </div>
                    </div>
                    <span className="font-semibold">₹{source.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ================= ACTIONS ================= */}
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-muted hover:bg-muted/80 transition">
                <Plus className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium">Add Income Source</span>
              </button>
              <button className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-muted hover:bg-muted/80 transition">
                <Download className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium">Download Report</span>
              </button>
              <button className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-muted hover:bg-muted/80 transition">
                <Bell className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium">Set Reminder</span>
              </button>
              <button className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-muted hover:bg-muted/80 transition">
                <Calendar className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium">View Pay Cycle</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}