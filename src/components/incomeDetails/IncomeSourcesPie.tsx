import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from "recharts";
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const totalIncome = incomeSources.reduce((s, i) => s + i.amount, 0);



  const handleSourceClick = (name: string) => {
    setSelectedSource(selectedSource === name ? null : name);
  };

  const renderActiveShape = (props: any) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
    } = props;

    return (
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 7} // 👈 pop-out effect
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    );
  };
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, value, color } = payload[0];
      const percent = ((value / totalIncome) * 100).toFixed(1);

      return (
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-xl px-4 py-1 min-w-[180px]">

          {/* Colored line */}
          <div
            className="h-1 w-full rounded-full mb-1"
            style={{ backgroundColor: color }}
          />

          <p className="text-sm font-semibold">{name}</p>

          <p className="text-lg font-bold mt-1">
            ₹{value.toLocaleString()}
          </p>

          <p className="text-xs text-muted-foreground mt-1">
            {percent}% of total income
          </p>
        </div>
      );
    }
    return null;
  };





  return (
    <Card className="h-full relative overflow-hidden shadow-md bg-card/80 backdrop-blur-md border-0">

      <CardHeader className="relative">
        <CardTitle className="flex items-start gap-3 text-lg font-semibold max-w-sm">
          <div className="p-2 rounded-lg bg-primary/5">
            <PieChartIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            Income Sources Breakdown
            <p className="text-muted-foreground font-normal text-sm">
              Click on any source to see reliability details
            </p>
          </div>

        </CardTitle>

      </CardHeader>

      <CardContent className="relative flex-1">
        <ResponsiveContainer width="100%" height={200} className="mb-2">
          <PieChart>
            <Pie
              data={incomeSources}
              dataKey="amount"
              nameKey="name"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={4}
              activeIndex={activeIndex ?? undefined}
              activeShape={renderActiveShape}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {incomeSources.map((entry, i) => (
                <Cell
                  key={i}
                  fill={PIE_COLORS[i]}
                  className="transition-all duration-300"
                />

              ))}
            </Pie>


            <Tooltip
              content={<CustomPieTooltip />}
              cursor={{ fill: "transparent" }}
            />

          </PieChart>
        </ResponsiveContainer>

        {/* Legend + Clickable Sources with Expandable Details */}
        <div className="">
          {incomeSources.map((source, i) => {
            const stability = getStabilityInfo(source.stability);
            const isExpanded = selectedSource === source.name;

            return (
              <div
                key={source.name}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => handleSourceClick(source.name)}
                className={`
    rounded-xl pt-2 border transition-all duration-500 overflow-hidden
    ${isExpanded ? "shadow-md border-primary/30" : "border-transparent hover:border-primary/20"}
    bg-card/50 backdrop-blur-sm cursor-pointer
  `}
              >

                {/* Main Row */}
                <div className="p-1 px-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                    <div>
                      <p className="font-semibold">{source.name}</p>

                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-md">₹{source.amount.toLocaleString()}</p>
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
                <div className="absolute -top-6 -right-1 pointer-events-none">
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-500 ${isExpanded ? "rotate-180" : ""
                      }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

      </CardContent>
    </Card>
  );
}