import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Search, Download, MoreVertical, Plus, FileOutput, ArrowLeftRight, ArrowDownLeft, ArrowUpRight, Calendar, ChevronDown, } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { name: "Income", value: 92000 },
  { name: "Expense", value: 58500 },
];

const COLORS = ["#22A2C9", "#BAE6FD"];

const stats = [
  { title: "Total Transactions This Month", value: "$125,430", change: "+12.5%", positive: true, icon: ArrowLeftRight },
  { title: "Total Income", value: "$92,000", change: "+15.5%", positive: true, icon: ArrowDownLeft },
  { title: "Total Expenses", value: "$58,500", change: "-8.5%", positive: false, icon: ArrowUpRight },
];

const transactions = [
  { id: "TXN-2402010", name: "Transfer from Bank", amount: "+$980", date: "February 29, 2025 · 09:41 PM", status: "Completed" },
  { id: "TXN-2402009", name: "Youtube Premium", amount: "-$20", date: "February 29, 2025 · 09:41 PM", status: "Completed" },
  { id: "TXN-2402008", name: "Internet", amount: "-$120", date: "February 29, 2025 · 01:56 PM", status: "Completed" },
  { id: "TXN-2402007", name: "Transfer from Bank", amount: "+$1,000", date: "February 29, 2025 · 11:36 AM", status: "Completed" },
  { id: "TXN-2402006", name: "Transfer from Bank", amount: "+$1,200", date: "February 29, 2025 · 11:25 AM", status: "Completed" },
  { id: "TXN-2402005", name: "Starbucks Coffee", amount: "-$12", date: "February 29, 2025 · 09:41 AM", status: "Completed" },
  { id: "TXN-2402004", name: "Salary (Freelance)", amount: "+$100", date: "February 28, 2025 · 10:12 PM", status: "Completed" },
  { id: "TXN-2402003", name: "Crypto Investment", amount: "+$1,000", date: "February 28, 2025 · 10:12 PM", status: "Completed" },
  { id: "TXN-2402002", name: "Amazon Purchase", amount: "-$30", date: "February 27, 2025 · 10:12 PM", status: "Completed" },
  { id: "TXN-2402001", name: "Spotify Premium", amount: "-$40", date: "February 27, 2025 · 08:00 AM", status: "Failed" },
  { id: "TXN-2402003", name: "Crypto Investment", amount: "+$1,000", date: "February 28, 2025 · 10:12 PM", status: "Completed" },
  { id: "TXN-2402002", name: "Amazon Purchase", amount: "-$30", date: "February 27, 2025 · 10:12 PM", status: "Completed" },
  { id: "TXN-2402001", name: "Spotify Premium", amount: "-$40", date: "February 27, 2025 · 08:00 AM", status: "Failed" },
];

const months = [
  { value: "2026-01", label: "January 2026" },
  { value: "2025-12", label: "December 2025" },
  { value: "2025-11", label: "November 2025" },
  // ... add more as needed
];

export default function TransactionsPage() {
  const [selectedMonth, setSelectedMonth] = useState("2026-01");
  //const [isCustomRangeOpen, setIsCustomRangeOpen] = useState(false);

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
    // Trigger data refetch/filter
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground mt-1 text-sm">Track and manage all transactions</p>
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => handleMonthChange(e.target.value)}
              className="appearance-none bg-background border border-primary/20 rounded-md pl-4 pr-10 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer hover:border-primary/40 transition-all"
            >
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          </div>
          <Button className="bg-primary">
            <span className="flex items-center gap-1">
              <Plus className="mt-0.5" />
              Add transaction
            </span>
          </Button>
          <Button variant="outline" className="text-primary border border-primary hover:bg-white hover:text-primary">
            <span className="flex items-center gap-1">
              <FileOutput />
              Export Report
            </span>

          </Button>
        </div>
      </div>


      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            {stats.map((s) => {
              const Icon = s.icon;

              return (
                <Card key={s.title}>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="border border-gray-200 p-1.5 rounded-md">
                        <Icon size={16} />
                      </div>
                      <p className="text-sm font-medium text-muted-foreground">{s.title}</p>
                    </div>

                    <h2 className="text-3xl font-bold text-foreground mt-1">{s.value}</h2>
                    <p className={`text-sm mt-2`}>
                      <span className={`${s.positive ? "text-green-600" : "text-red-500"}`}>{s.change}</span> compared to last month
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>


          {/* Transactions Table */}
          <Card className="lg:col-span-3">
            <CardHeader className="flex flex-row justify-between items-center p-3">
              <h2 className="font-semibold text-lg">Transactions</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-9 w-56" />
                </div>
                <button

                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-background border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all text-sm font-medium"
                >

                  All Status
                  <ChevronDown
                    className={`h-4 w-4 transition-transform `}
                  />
                </button>

                <button

                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-background border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all text-sm font-medium"
                >

                  Latest
                  <ChevronDown
                    className={`h-4 w-4 transition-transform `}
                  />
                </button>
                <Button className="bg-primary" size="icon"><Download className="h-4 w-4" /></Button>


              </div>
            </CardHeader>
            <CardContent className="p-5 ">
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/60">
                    <tr className="text-left text-muted-foreground ">
                      <th className="p-3 font-medium">Transaction ID</th>
                      <th className="p-3 font-medium">Payment Name</th>
                      <th className="p-3 font-medium">Amount</th>
                      <th className="p-3 font-medium">Date</th>
                      <th className="p-3 font-medium">Status</th>
                      <th className="p-3 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((t) => (
                      <tr key={t.id} className="border-b last:border-0">
                        <td className="p-3 text-muted-foreground">{t.id}</td>
                        <td className="p-3">{t.name}</td>
                        <td className={`p-3 font-medium ${t.amount.startsWith("+") ? "text-green-600" : "text-red-500"}`}>
                          {t.amount}
                        </td>
                        <td className="p-3 text-muted-foreground">{t.date}</td>
                        <td className="p-3">
                          <Badge className={`shadow-none bg-white ${t.status === "Failed"
                            ? "text-red-500"
                            : "text-green-600"
                            }`}>{t.status}</Badge>
                        </td>
                        <td className="p-3"><MoreVertical className="h-4 w-4 text-muted-foreground" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                {/* Left */}
                <div>
                  Show data <span className="font-medium text-foreground bg-muted px-3 py-2 rounded-md">10</span> of{" "}
                  <span className=" text-foreground">200</span>
                </div>

                {/* Right */}
                <div className="flex items-center gap-1">
                  <button className="h-8 w-8 flex items-center justify-center rounded-full border hover:bg-muted transition">
                    «
                  </button>
                  <button className="h-8 w-8 flex items-center justify-center rounded-full border hover:bg-muted transition">
                    ‹
                  </button>

                  <button className="h-8 w-8 rounded-full bg-primary text-white font-medium">
                    1
                  </button>
                  <button className="h-8 w-8 rounded-full border hover:bg-muted transition">
                    2
                  </button>
                  <button className="h-8 w-8 rounded-full border hover:bg-muted transition">
                    3
                  </button>

                  <span className="px-1">…</span>

                  <button className="h-8 w-8 rounded-full border hover:bg-muted transition">
                    10
                  </button>

                  <button className="h-8 w-8 flex items-center justify-center rounded-full border hover:bg-muted transition">
                    ›
                  </button>
                  <button className="h-8 w-8 flex items-center justify-center rounded-full border hover:bg-muted transition">
                    »
                  </button>
                </div>
              </div>

            </CardContent>
          </Card>

        </div>


        {/* Right Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Category Breakdown</h3>
            </CardHeader>

            <CardContent>
              {/* Donut Chart */}
              <div className="relative h-[270px] w-full">

                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={3}
                      dataKey="value"
                      cornerRadius={8}
                    >
                      {chartData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-2xl font-semibold">125K</p>
                  <p className="text-sm text-muted-foreground">
                    Total Balance
                  </p>
                </div>
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-6 mt-4 text-base font-medium">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-primary mt-1" />
                  In
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-sky-200 mt-1" />
                  Out
                </div>
              </div>

              {/* Insight */}
              <p className="text-sm mt-6 text-muted-foreground bg-gray-100/70 p-4 rounded-lg">
                Your dining expense increased by{" "}
                <span className="text-primary font-medium">20%</span>{" "}
                compared to last month
              </p>
            </CardContent>
          </Card>


          <Card className="bg-primary text-white">
            <CardContent className="p-5">
              <h4 className="font-semibold">AI Insight</h4>
              <p className="text-sm mt-2">You have saved $1,200 this month. Adding an extra 5% to savings can help you reach your financial goals faster.</p>
              <Button className="mt-4 bg-white text-primary hover:bg-white">Auto Save Now</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h4 className="font-semibold">Subscriptions List</h4>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between"><span>Youtube</span><span>$20</span></div>
              <div className="flex justify-between"><span>Spotify</span><span>$69</span></div>
              <div className="flex justify-between"><span>Dribbble Pro</span><span>$59</span></div>
              <Button variant="outline" className="w-full mt-2 border-primary text-primary">Manage Subscriptions</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
