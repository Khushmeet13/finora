import { useState } from "react";
import { Calendar, Briefcase, PiggyBank, TrendingUp, CreditCard, Filter, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";

// Sample recent transactions - replace with your real data
const recentTransactions = [
  { id: 1, source: "Full-time Salary", date: new Date("2026-01-01"), amount: 45000, status: "completed", sourceType: "salary" },
  { id: 2, source: "Freelance Project", date: new Date("2026-01-03"), amount: 15000, status: "completed", sourceType: "freelance" },
  { id: 3, source: "Stock Dividends", date: new Date("2025-12-30"), amount: 5000, status: "completed", sourceType: "investment" },
  { id: 4, source: "Client Payment", date: new Date("2026-01-04"), amount: 10000, status: "pending", sourceType: "freelance" },
  { id: 5, source: "Bonus", date: new Date("2025-12-25"), amount: 7000, status: "completed", sourceType: "salary" },
];

const sourceTypes = {
  salary: { icon: Briefcase, color: "text-green-600", bg: "bg-green-500/10" },
  freelance: { icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-500/10" },
  investment: { icon: PiggyBank, color: "text-amber-600", bg: "bg-amber-500/10" },
  other: { icon: CreditCard, color: "text-purple-600", bg: "bg-purple-500/10" },
};

const allSources = ["All", ...Array.from(new Set(recentTransactions.map(t => t.source)))];

export default function RecentIncomeTransactions() {
  const [filter, setFilter] = useState("All");

  const filteredTransactions = filter === "All"
    ? recentTransactions
    : recentTransactions.filter(t => t.source === filter);

  const getSourceInfo = (type: string) => {
    return sourceTypes[type as keyof typeof sourceTypes] || sourceTypes.other;
  };

  return (
    <Card className="relative overflow-hidden shadow-md bg-card/80 backdrop-blur-md border-0">

      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-start gap-3 text-lg font-semibold max-w-sm">
            <div className="p-2 rounded-lg bg-primary/5">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              Recent Income Transactions
              <p className="text-muted-foreground font-normal text-sm">
                Latest deposits and incoming payments
              </p>
            </div>

          </CardTitle>

          {/* Quick Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-background/80 border-primary/20"
                >
                  {filter}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" className="w-36">
                {allSources.map((source) => (
                  <DropdownMenuItem
                    key={source}
                    onClick={() => setFilter(source)}
                    className="cursor-pointer"
                  >
                    {source}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>

      </CardHeader>

      <CardContent className="relative">
        {/* Desktop: Clean Table */}
        <div className="hidden md:block">
          <div className="rounded-xl border border-primary/10 overflow-hidden">
            <table className="w-full">
              <thead className="bg-primary/5">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Source</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-center px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10">
                {filteredTransactions.map((tx) => {
                  //const info = getSourceInfo(tx.sourceType);
                  //const Icon = info.icon;

                  return (
                    <tr key={tx.id} className="transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-sm">{tx.source}</span>
                        </div>
                      </td>
                      <td className="px-6 py-2 text-muted-foreground text-sm">
                        {format(tx.date, "dd MMM yyyy")}
                      </td>
                      <td className="px-6 py-2 text-right">
                        <span className="font-bold text-sm text-green-600">
                          +₹{tx.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-2 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${tx.status === "completed"
                          ? "bg-green-500/10 text-green-600"
                          : "bg-amber-500/10 text-amber-600"
                          }`}>
                          {tx.status === "completed" ? "✓ Completed" : "⏳ Pending"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile: Card List */}
        <div className="md:hidden space-y-4">
          {filteredTransactions.map((tx) => {
            const info = getSourceInfo(tx.sourceType);
            const Icon = info.icon;

            return (
              <div
                key={tx.id}
                className="p-4 rounded-xl border border-primary/10 bg-card/50 hover:bg-primary/5 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${info.bg}`}>
                      <Icon className={`h-5 w-5 ${info.color}`} />
                    </div>
                    <div>
                      <p className="font-semibold">{tx.source}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(tx.date, "dd MMM yyyy")}
                      </p>
                    </div>
                  </div>
                  <span className={`text-2xl font-bold text-green-600`}>
                    +₹{tx.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${tx.status === "completed"
                    ? "text-green-600"
                    : "text-amber-600"
                    }`}>
                    {tx.status === "completed" ? "✓ Completed" : "⏳ Pending"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No transactions found for selected filter</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}