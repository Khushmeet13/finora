import { useState } from "react";
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
  Legend,
  ReferenceLine,
  Brush
} from "recharts";
import {
  ArrowLeft,
  TrendingUp,
  Plus,
  Download,
  Bell,
  IndianRupee,
  Calendar,
  Info,
  ShieldCheck,
  ArrowDown,
  ShieldAlert
} from "lucide-react";
import { Link } from "react-router-dom";
import IncomeSummaryCards from "../components/incomeDetails/IncomeSummaryCards";
import IncomeSourcesPie from "../components/incomeDetails/IncomeSourcesPie";
import IncomeVsExpensesComparison from "../components/incomeDetails/IncomeVsExpensesComparison";
import RecentIncomeTransactions from "../components/incomeDetails/RecentIncomeTransactions";
import IncomePageHeader from "../components/incomeDetails/IncomePageHeader";


/* ================= DUMMY DATA ================= */
const monthlyTrend = [
  { month: "Aug 25", salary: 45000, freelance: 15000, other: 8000, total: 68000 },
  { month: "Sep 25", salary: 45000, freelance: 20000, other: 10000, total: 75000 },
  { month: "Oct 25", salary: 45000, freelance: 18000, other: 12000, total: 75000 },
  { month: "Nov 25", salary: 45000, freelance: 22000, other: 9000, total: 76000 },
  { month: "Dec 25", salary: 50000, freelance: 30000, other: 15000, total: 95000 },
  { month: "Jan 26", salary: 45000, freelance: 25000, other: 10000, total: 80000 },
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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const growth = data.total > monthlyTrend[monthlyTrend.length - 2]?.total
      ? ((data.total - monthlyTrend[monthlyTrend.length - 2].total) / monthlyTrend[monthlyTrend.length - 2].total * 100).toFixed(1)
      : null;

    const topContributor = Object.keys(data)
      .filter(k => k !== "month" && k !== "total")
      .reduce((a, b) => (data[a] > data[b] ? a : b));

    const insight = topContributor === "freelance" && growth
      ? `Freelance + Salary boosted income by ${growth}%`
      : topContributor === "salary"
        ? "Stable salary forms the core of your income"
        : "Diversified sources driving steady growth";

    return (
      <div className="bg-background/95 backdrop-blur border shadow-xl rounded-xl p-4 space-y-3">
        <p className="font-bold text-lg">{label}</p>
        <div className="space-y-2">
          <div className="flex justify-between gap-6">
            <span className="text-muted-foreground">Salary</span>
            <span className="font-semibold text-green-600">₹{data.salary.toLocaleString()}</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-muted-foreground">Freelance</span>
            <span className="font-semibold text-blue-600">₹{data.freelance.toLocaleString()}</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-muted-foreground">Other</span>
            <span className="font-semibold text-amber-600">₹{data.other.toLocaleString()}</span>
          </div>
          <div className="h-px bg-border my-2" />
          <div className="flex justify-between gap-6">
            <span className="font-medium">Total Income</span>
            <span className="font-bold text-2xl text-primary">₹{data.total.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/10 px-3 py-2 rounded-lg">
          <Info className="h-4 w-4 text-primary" />
          <p className="font-medium">{insight}</p>
        </div>
      </div>
    );
  }
  return null;
};

export default function IncomeDetails() {
  const [openAddIncome, setOpenAddIncome] = useState(false);


  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="max-w-8xl mx-auto  space-y-10">
        {/* ================= HEADER ================= */}
        {/* <div className="flex items-center gap-4">
          <Link to="/">
            <button className="p-3 rounded-md bg-gray-50 hover:bg-muted transition-shadow shadow-sm">
              <ArrowLeft className="h-4 w-4" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Income Overview</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Track your earnings, sources, and growth at a glance
            </p>
          </div>
        </div> */}
        <IncomePageHeader />

        {/* ================= TOP SUMMARY CARDS ================= */}
        {/* <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: "Total Monthly Income", value: `₹${totalMonthlyIncome.toLocaleString()}`, icon: Wallet },
            { label: "Primary Salary (Net)", value: `₹${netSalary.toLocaleString()}`, icon: Briefcase },
            { label: "Other Income", value: `₹${totalOtherIncome.toLocaleString()}`, icon: PiggyBank },
            { label: "Growth vs Last Month", value: growthRate, icon: TrendingUp, isGrowth: true },
            { label: "Deductions", value: `₹${totalDeductions.toLocaleString()}`, icon: CreditCard },
          ].map((stat) => (
            <Card
              key={stat.label}
              className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/30 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p
                      className={`text-2xl font-semibold mt-2 ${stat.isGrowth
                        ? parseFloat(growthRate.replace("%", "")) >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                        : "text-foreground"
                        }`}
                    >
                      {stat.value}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                {/* Optional subtle gradient overlay 
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
              </CardContent>
            </Card>
          ))}
        </div> */}

        <IncomeSummaryCards />

        {/* ================= INSIGHTS BANNER ================= */}
        <Card className="relative overflow-hidden backdrop-blur-md border-0 shadow-md transition-all duration-500">
          <CardContent className="relative p-8">
            <div className="flex items-start gap-5">
              {/* Icon with glow effect */}
              <div className="relative p-2 rounded-lg bg-primary/5">
                <div className="absolute inset-0 rounded-lg bg-primary/5 blur-xl" />
                <Info className="relative h-5 w-5 text-primary" />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-4">
                  Smart Insights
                </h3>

                <div className="space-y-4">
                  {/* Insight 1 */}
                  <div className="flex items-center gap-4 p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors duration-300">
                    <TrendingUp className="h-5 w-5 text-primary flex-shrink-0" />
                    <p className="text-foreground">
                      Your income grew by{" "}
                      <span className="text-xl font-medium text-primary">{growthRate}</span>{" "}
                      this month — keep it up!
                    </p>
                  </div>

                  {/* Insight 2 */}
                  <div className="flex items-center gap-4 p-2 rounded-lg bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors duration-300">
                    <PieChart className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                    <p className="text-foreground">
                      Freelance now contributes{" "}
                      <span className="text-xl font-medium text-emerald-600">24.5%</span> of
                      your total income — diversifying nicely!
                    </p>
                  </div>

                  {/* Insight 3 */}
                  <div className="flex items-center gap-4 p-2 rounded-lg bg-blue-500/5 hover:bg-blue-500/10 transition-colors duration-300">
                    <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <p className="text-foreground">
                      Only <span className="text-lg font-medium text-blue-600">18%</span> of
                      gross salary goes to deductions —{" "}
                      <span className="font-medium text-primary">better than average!</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ================= SALARY BREAKDOWN + DEDUCTIONS ================= */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Salary Structure */}
          <Card className="relative overflow-hidden shadow-md backdrop-blur-md border-0">

            <CardHeader className="relative pb-8">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                <div className="p-2 rounded-lg bg-primary/5">
                  <IndianRupee className="h-5 w-5 text-primary" />
                </div>
                <div>
                  Salary Structure
                  <p className="text-muted-foreground font-normal text-sm">Understand how your monthly pay is calculated</p>
                </div>

              </CardTitle>

            </CardHeader>

            <CardContent className="relative space-y-4">
              {/* Gross Salary Highlight */}
              <div className="p-4 rounded-lg border ">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Gross Monthly Salary</p>
                    <p className="text-2xl font-semibold text-black mt-1">
                      ₹{grossSalary.toLocaleString()}
                    </p>
                  </div>
                  <TrendingUp className="h-10 w-10 text-primary" />
                </div>
              </div>

              {/* Earnings Breakdown */}
              <div className="space-y-5">

                {salaryBreakdown.map((item, idx) => (
                  <div key={item.label} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{item.label}</span>
                      <div className="text-right">
                        <span className="font-medium text-lg">₹{item.amount.toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground ml-2">({item.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-primary to-primary/70
                       transition-all duration-1000 ease-out group-hover:scale-x-105"
                        style={{
                          width: `${item.percentage}%`,
                          transformOrigin: "left",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Flow to Net Salary */}
              <div className="relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500/50 to-red-500/50 -translate-x-1/2" />

                <div className="flex items-center justify-center my-4">
                  <ArrowDown className="h-6 w-6 text-primary animate-bounce" />
                </div>
              </div>

              {/* Net Salary Highlight */}
              <div className="p-4 rounded-xl border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">Take-Home Pay</p>
                    <p className="text-3xl font-semibold text-black mt-2">
                      ₹{netSalary.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      After all statutory & voluntary deductions
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200/20">
                      <span className="text-xl font-bold text-black">
                        {((netSalary / grossSalary) * 100).toFixed(1)}%
                      </span>
                      <span className="text-sm text-muted-foreground">of Gross</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Insight */}
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>Earnings</span>
                </div>
                <span>•</span>
                <span>
                  Net = Gross − Deductions ({((totalDeductions / grossSalary) * 100).toFixed(1)}% withheld)
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Deductions */}
          <Card className="relative overflow-hidden shadow-md backdrop-blur-md border-0">

            <CardHeader className="relative pb-8">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                <div className="p-2 rounded-lg bg-primary/5">
                  <ShieldAlert className="h-5 w-5 text-primary" />
                </div>
                <div>
                  Deductions & Withholdings
                  <p className="text-muted-foreground text-sm font-normal">
                    Statutory and voluntary deductions from your gross salary
                  </p>
                </div>

              </CardTitle>

            </CardHeader>

            <CardContent className="relative space-y-4">
              {/* Total Deductions Highlight */}
              <div className="p-4 rounded-lg border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Deductions</p>
                    <p className="text-2xl font-semibold text-black mt-1">
                      -₹{totalDeductions.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200/20">
                      <span className="text-xl font-bold text-black">
                        {((totalDeductions / grossSalary) * 100).toFixed(1)}%
                      </span>
                      <span className="text-sm text-muted-foreground">of Gross</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deductions Breakdown */}
              <div className="space-y-4">

                {deductions.map((item, idx) => (
                  <div key={item.label} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{item.label}</span>
                      <div className="text-right">
                        <span className="font-medium text-lg text-black">
                          -₹{item.amount.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground ml-2">
                          ({item.percentage}%)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-primary to-primary/70 
                       transition-all duration-1000 ease-out group-hover:scale-x-105"
                        style={{
                          width: `${item.percentage}%`,
                          transformOrigin: "left",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Flow Indicator */}
              <div className="flex items-center justify-center">
                <ArrowDown className="h-6 w-6 text-red-500/60 animate-bounce" />
              </div>

              {/* Impact on Take-Home */}
              <div className="p-4 rounded-lg border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">
                      Impact on Your Pay
                    </p>
                    <p className="text-xl font-medium mt-2">
                      These deductions reduce your in-hand salary by{" "}
                      <span className="text-red-600">
                        ₹{totalDeductions.toLocaleString()}
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Some are mandatory (tax, PF), others optional (insurance)
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Legend */}
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>Deductions</span>
                </div>
                <span>•</span>
                <span>
                  Net Salary = Gross − Total Deductions
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ================= MONTHLY TREND + SOURCES ================= */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Month-wise Income Trend */}
          <Card className="lg:col-span-2 relative overflow-hidden shadow-xl bg-card/80 backdrop-blur-md border-0">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-emerald-500/5 to-blue-500/5" />

            <CardHeader className="relative pb-6">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  Income Trend (Last 6 Months)
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-600">
                    +17.6% vs 6 months ago
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground mt-2">
                Track how your salary, freelance, and other sources evolve over time
              </p>
            </CardHeader>

            <CardContent className="relative">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyTrend} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" opacity={0.5} />

                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    stroke="#888"
                  />

                  <YAxis
                    tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                    tick={{ fontSize: 12 }}
                    stroke="#888"
                  />

                  {/* Average reference line */}
                  <ReferenceLine
                    y={monthlyTrend.reduce((sum, m) => sum + m.total, 0) / monthlyTrend.length}
                    stroke="#a78bfa"
                    strokeDasharray="6 6"
                    label={{ value: "Avg", position: "insideTopRight", fill: "#a78bfa" }}
                  />

                  {/* Lines */}
                  <Line
                    type="monotone"
                    dataKey="salary"
                    stroke="#22c55e"
                    strokeWidth={4}
                    dot={{ r: 6, fill: "#22c55e" }}
                    activeDot={{ r: 8 }}
                    name="Salary"
                  />
                  <Line
                    type="monotone"
                    dataKey="freelance"
                    stroke="#3b82f6"
                    strokeWidth={4}
                    dot={{ r: 6, fill: "#3b82f6" }}
                    activeDot={{ r: 8 }}
                    name="Freelance"
                  />
                  <Line
                    type="monotone"
                    dataKey="other"
                    stroke="#f59e0b"
                    strokeWidth={4}
                    dot={{ r: 6, fill: "#f59e0b" }}
                    activeDot={{ r: 8 }}
                    name="Other"
                  />

                  {/* Total Income Line - Highlighted */}
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#c57147" /* primary color hue */
                    strokeWidth={5}
                    dot={{ r: 8, fill: "#c57147", strokeWidth: 3, stroke: "#fff" }}
                    activeDot={{ r: 10, strokeWidth: 3, stroke: "#fff" }}
                    name="Total Income"
                  />

                  <Tooltip content={<CustomTooltip />} />

                  <Legend
                    wrapperStyle={{ paddingTop: "20px" }}
                    iconType="circle"
                  />

                  {/* Brush for zoom/scroll on larger datasets */}
                  <Brush
                    dataKey="month"
                    height={30}
                    stroke="#c57147"
                    fill="#f3f4f6"
                  />
                </LineChart>
              </ResponsiveContainer>

              {/* Quick Summary Badges */}
              <div className="flex flex-wrap gap-4 mt-6 justify-center">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10">
                  <span className="text-sm text-muted-foreground">Primary Source:</span>
                  <span className="font-bold text-green-600">Salary</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10">
                  <span className="text-sm text-muted-foreground">Fastest Growing:</span>
                  <span className="font-bold text-blue-600">Freelance</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10">
                  <span className="text-sm text-muted-foreground">Diversification:</span>
                  <span className="font-bold text-amber-600">Improving</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Income Sources Pie */}
          {/* <Card className="shadow-lg border-0">
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
          </Card> */}

          <IncomeSourcesPie />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <IncomeVsExpensesComparison />
          <RecentIncomeTransactions />
        </div>

        {/* ================= ACTIONS ================= */}
        <Card
          className="
    border border-border/60
    bg-background/80 backdrop-blur
    shadow-sm hover:shadow-lg
    transition-all duration-300
    rounded-3xl
  "
        >
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold tracking-tight">
              Quick Actions
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage income faster
            </p>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

              {/* Action Item */}
              <button
                className="
          group relative
          flex flex-col items-center justify-center gap-3
          rounded-2xl p-6
          bg-muted/50
          border border-border/60

          hover:bg-primary/5
          hover:border-primary/30
          hover:shadow-md

          transition-all duration-300
        "
              >
                <div
                  className="
            flex h-14 w-14 items-center justify-center
            rounded-xl
            bg-primary/10 text-primary

            group-hover:scale-110
            group-hover:bg-primary/15
            transition
          "
                >
                  <Plus className="h-7 w-7" />
                </div>

                <span className="text-sm font-medium text-center">
                  Add Income Source
                </span>

                {/* Hover Glow */}
                <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-primary/0 group-hover:ring-primary/20 transition" />
              </button>

              {/* Repeat for others */}
              <button className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl p-6 bg-muted/50 border border-border/60 hover:bg-primary/5 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition">
                  <Download className="h-7 w-7" />
                </div>
                <span className="text-sm font-medium">Download Report</span>
                <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-primary/0 group-hover:ring-primary/20 transition" />
              </button>

              <button className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl p-6 bg-muted/50 border border-border/60 hover:bg-primary/5 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition">
                  <Bell className="h-7 w-7" />
                </div>
                <span className="text-sm font-medium">Set Reminder</span>
                <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-primary/0 group-hover:ring-primary/20 transition" />
              </button>

              <button className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl p-6 bg-muted/50 border border-border/60 hover:bg-primary/5 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition">
                  <Calendar className="h-7 w-7" />
                </div>
                <span className="text-sm font-medium">View Pay Cycle</span>
                <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-primary/0 group-hover:ring-primary/20 transition" />
              </button>
            </div>
          </CardContent>
        </Card>


        <button
          onClick={() => setOpenAddIncome(true)}
          className="
    fixed bottom-6 right-6 z-50
    flex items-center gap-3

    rounded-full
    bg-primary text-white
    shadow-xl

    px-5 py-3
    text-sm font-medium

    hover:shadow-2xl hover:scale-105
    active:scale-95
    transition-all duration-300
  "
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Add Income</span>
        </button>

        {openAddIncome && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-background shadow-xl p-6 space-y-6">

              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Add Income</h2>
                <button
                  onClick={() => setOpenAddIncome(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              {/* Form */}
              <div className="space-y-4">
                {/* Amount */}
                <div>
                  <label className="text-sm font-medium">Amount</label>
                  <div className="flex items-center gap-2 mt-1 border rounded-lg px-3 py-2">
                    <IndianRupee className="h-4 w-4 text-muted-foreground" />
                    <input
                      type="number"
                      placeholder="Enter amount"
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <input
                    type="date"
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                  />
                </div>

                {/* Source */}
                <div>
                  <label className="text-sm font-medium">Source</label>
                  <select className="w-full mt-1 border rounded-lg px-3 py-2">
                    <option>Salary</option>
                    <option>Freelance</option>
                    <option>Business</option>
                    <option>Investment</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <input
                    type="text"
                    placeholder="Optional note"
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                  />
                </div>

                {/* Recurring */}
                <div>
                  <label className="text-sm font-medium">Recurring</label>
                  <select className="w-full mt-1 border rounded-lg px-3 py-2">
                    <option>No</option>
                    <option>Monthly</option>
                    <option>Bi-Weekly</option>
                    <option>Custom</option>
                  </select>
                </div>
              </div>

              {/* Bank Import (Future Ready) */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <p className="text-sm text-muted-foreground">
                  Import income automatically from linked bank accounts
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setOpenAddIncome(false)}
                  className="flex-1 rounded-xl border py-2"
                >
                  Cancel
                </button>
                <button
                  className="flex-1 rounded-xl bg-primary text-white py-2 hover:bg-primary/90 transition"
                >
                  Save Income
                </button>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
}