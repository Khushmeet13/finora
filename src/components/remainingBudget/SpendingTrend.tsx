"use client";

import { useState, useEffect } from "react";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

const mockDailyData = [
  { date: "Mon", amount: 1450 },
  { date: "Tue", amount: 1680 },
  { date: "Wed", amount: 1320 },
  { date: "Thu", amount: 980 },
  { date: "Fri", amount: 750 },
  { date: "Sat", amount: 620 },
  { date: "Sun", amount: 540 },
];

const SpendingTrend = () => {
  const [data] = useState(mockDailyData);

  const [trend, setTrend] = useState<"down" | "up" | "stable">("down");
  const [percentageChange, setPercentageChange] = useState(0);

  useEffect(() => {
    if (data.length < 2) return;

    const first = data[0].amount;
    const last = data[data.length - 1].amount;
    const change = ((first - last) / first) * 100;
    setPercentageChange(Math.round(Math.abs(change)));

    if (change > 12) setTrend("down");
    else if (change < -12) setTrend("up");
    else setTrend("stable");
  }, [data]);

  const maxAmount = Math.max(...data.map((d) => d.amount), 100);
  const minAmount = Math.min(...data.map((d) => d.amount), 0);
  const range = maxAmount - minAmount || 1;

  const totalSpent = data.reduce((sum, d) => sum + d.amount, 0);
  const avgDaily = Math.round(totalSpent / data.length);

  const TrendIcon = trend === "down" ? TrendingDown : trend === "up" ? TrendingUp : Minus;

  const trendColor =
    trend === "down" ? "text-emerald-600" : trend === "up" ? "text-rose-600" : "text-amber-600";

  const getY = (amount: number) => {
    const normalized = (amount - minAmount) / range;
    return 100 - normalized * 85; // leave some padding top/bottom
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
      {/* Header */}
      <div className="px-5 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 text-lg tracking-tight">Spending Trend</h3>

        <div className={`flex items-center gap-1.5 text-sm font-medium ${trendColor}`}>
          <TrendIcon size={16} strokeWidth={2.2} />
          <span>
            {trend === "down" ? "Decreasing" : trend === "up" ? "Increasing" : "Stable"}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-2">
        {/* Key numbers */}
        <div className="grid grid-cols-3 gap-20 text-sm">
          <div>
            <p className="text-gray-500">This week</p>
            <p className="font-semibold text-gray-900">
              ₹{totalSpent.toLocaleString("en-IN")}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Avg/day</p>
            <p className="font-semibold text-gray-900">
              ₹{avgDaily.toLocaleString("en-IN")}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Change</p>
            <p className={`font-semibold  ${trendColor}`}>
              {trend === "down" ? "↓" : trend === "up" ? "↑" : "→"} {percentageChange}%
            </p>
          </div>
        </div>

        {/* === Modern Line Chart === */}
        <div className="relative h-44 bg-gray-50/40 rounded-md border border-gray-100 overflow-hidden">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Area under the line */}
            <path
              d={`
                M 0 ${getY(data[0].amount)}
                ${data
                  .map((d, i) => {
                    const x = (i / (data.length - 1)) * 100;
                    return `L ${x} ${getY(d.amount)}`;
                  })
                  .join(" ")}
                L 100 ${getY(data[data.length - 1].amount)}
                L 100 100
                L 0 100
                Z
              `}
              fill="url(#areaGradient)"
            />

            {/* Main line */}
            <path
              d={`
                M 0 ${getY(data[0].amount)}
                ${data
                  .map((d, i) => {
                    const x = (i / (data.length - 1)) * 100;
                    return `L ${x} ${getY(d.amount)}`;
                  })
                  .join(" ")}
              `}
              fill="none"
              stroke="#6366f1"
              strokeWidth="0.8"
              strokeLinecap="round"
              className="drop-shadow-md"
            />

            {/* Data points */}
            {data.map((d, i) => {
              const x = (i / (data.length - 1)) * 100;
              const y = getY(d.amount);
              //const isLast = i === data.length - 1;

              return (
                <g key={i}>
                  <circle
                    cx={x}
                    cy={y}
                    r={1}
                    fill="#ffffff"
                   
                    className="transition-all duration-300 group-hover:scale-125"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={1}
                    fill="#6366f1"
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>

          {/* X-axis labels */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-between px-4 text-xs text-gray-600 font-medium">
            {data.map((d) => (
              <span key={d.date} className="w-8 text-center">
                {d.date}
              </span>
            ))}
          </div>

          {/* Hover tooltips */}
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 100;
            return (
              <div
                key={i}
                className="absolute top-0 bottom-0 w-[14%] group"
                style={{ left: `${x}%`, transform: "translateX(-50%)" }}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-gray-900/95 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
                  {d.date}: <strong>₹{d.amount.toLocaleString("en-IN")}</strong>
                </div>
              </div>
            );
          })}
        </div>

        {/* Insight text */}
        <div className="text-xs text-gray-600 bg-gray-50/70 rounded-lg p-2 px-4 border border-gray-100/80">
          {trend === "down" ? (
            <>
              Excellent! Your daily spending has <strong>dropped by {percentageChange}%</strong> since Monday.
            </>
          ) : trend === "up" ? (
            <>Spending is trending upward — worth reviewing recent expenses.</>
          ) : (
            <>Your spending has been quite consistent this week.</>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpendingTrend;