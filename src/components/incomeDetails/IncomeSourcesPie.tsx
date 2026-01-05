import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChevronDown, AlertCircle, TrendingUp, Clock, PieChartIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";

// Define colors for consistency
const PIE_COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];

// Enhanced income sources with stability tag
const incomeSources = [
  { name: "Full-time Salary", amount: 45000, frequency: "Monthly", status: "active", stability: "stable" },
  { name: "Freelance Projects", amount: 25000, frequency: "Irregular", status: "active", stability: "irregular" },
  { name: "Stock Dividends", amount: 10000, frequency: "Quarterly", status: "active", stability: "irregular" },
  { name: "Rental Income", amount: 5000, frequency: "Monthly", status: "inactive", stability: "risky" },
];

const getStabilityInfo = (stability: string) => {
  switch (stability) {
    case "stable":
      return { emoji: "🟢", label: "Stable", color: "text-green-600", bg: "bg-green-500/10", desc: "Reliable and predictable every month" };
    case "irregular":
      return { emoji: "🟡", label: "Irregular", color: "text-amber-600", bg: "bg-amber-500/10", desc: "Varies month-to-month, growth potential" };
    case "risky":
      return { emoji: "🔴", label: "Risky", color: "text-red-600", bg: "bg-red-500/10", desc: "Unreliable or currently inactive" };
    default:
      return { emoji: "", label: "", color: "", bg: "", desc: "" };
  }
};

export default function IncomeSourcesPie() {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const handleSourceClick = (name: string) => {
    setSelectedSource(selectedSource === name ? null : name);
  };

  return (
    <Card className="relative overflow-hidden shadow-xl bg-card/80 backdrop-blur-md border-0">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-500/5 to-emerald-500/5" />
      
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-3 text-2xl font-bold">
          <div className="p-2 rounded-xl bg-primary/10">
            <PieChartIcon className="h-6 w-6 text-primary" /> {/* You can use a custom icon or lucide */}
          </div>
          Income Sources Breakdown
        </CardTitle>
        <p className="text-muted-foreground mt-2">
          Click on any source to see reliability details
        </p>
      </CardHeader>

      <CardContent className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={incomeSources}
              dataKey="amount"
              nameKey="name"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={4}
              cursor="pointer"
              onClick={(data) => handleSourceClick(data.name)}
            >
              {incomeSources.map((entry, i) => (
                <Cell
                  key={i}
                  fill={PIE_COLORS[i]}
                  stroke={selectedSource === entry.name ? "#fff" : undefined}
                  strokeWidth={selectedSource === entry.name ? 4 : 0}
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => `₹${value.toLocaleString()}`}
              contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Legend + Clickable Sources with Expandable Details */}
        <div className="mt-8 space-y-4">
          {incomeSources.map((source, i) => {
            const stability = getStabilityInfo(source.stability);
            const isExpanded = selectedSource === source.name;

            return (
              <div
                key={source.name}
                className={`
                  rounded-xl border transition-all duration-500 overflow-hidden
                  ${isExpanded ? "shadow-lg border-primary/30" : "border-transparent hover:border-primary/20"}
                  bg-card/50 backdrop-blur-sm cursor-pointer
                `}
                onClick={() => handleSourceClick(source.name)}
              >
                {/* Main Row */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-5 h-5 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                    <div>
                      <p className="font-semibold">{source.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{source.frequency}</span>
                        <span className={`text-xs font-bold ${stability.color}`}>
                          {stability.emoji} {stability.label}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">₹{source.amount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">
                      {((source.amount / incomeSources.reduce((s, t) => s + t.amount, 0)) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>

                {/* Expandable Details */}
                <div
                  className={`
                    overflow-hidden transition-all duration-500 ease-in-out
                    ${isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  <div className="px-4 pb-4 pt-2 border-t border-primary/10">
                    <div className={`p-3 rounded-lg ${stability.bg} flex items-start gap-3`}>
                      {stability.label === "Stable" && <TrendingUp className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />}
                      {stability.label === "Irregular" && <Clock className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />}
                      {stability.label === "Risky" && <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />}
                      <div>
                        <p className="font-medium text-sm">{stability.label} Income Source</p>
                        <p className="text-xs text-muted-foreground mt-1">{stability.desc}</p>
                        {source.status === "inactive" && (
                          <p className="text-xs font-medium text-red-600 mt-2">
                            ⚠️ Currently inactive — consider reactivation or replacement
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chevron Indicator */}
                <div className="absolute top-4 right-4 pointer-events-none">
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-500 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Overall Insight */}
        <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-sm text-center text-muted-foreground">
            <span className="font-medium">Tip:</span> Aim for <span className="text-green-600 font-bold">60%+</span> from 🟢 Stable sources for financial security
          </p>
        </div>
      </CardContent>
    </Card>
  );
}