"use client"; // Agar Next.js app hai to yeh zaroori hai (state ke liye)

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const categoryHistory = [
  {
    name: "Food",
    color: "emerald",
    months: [
      { month: "Feb 2025", used: 8200, total: 10000 },
      { month: "Mar 2025", used: 6800, total: 10000 },
      { month: "Apr 2025", used: 7700, total: 10000 },
    ],
  },
  {
    name: "Travel",
    color: "blue",
    months: [
      { month: "Feb 2025", used: 3200, total: 5000 },
      { month: "Mar 2025", used: 5100, total: 5000 },
      { month: "Apr 2025", used: 4600, total: 5000 },
    ],
  },
  {
    name: "Shopping",
    color: "purple",
    months: [
      { month: "Feb 2025", used: 4800, total: 8000 },
      { month: "Mar 2025", used: 7100, total: 8000 },
      { month: "Apr 2025", used: 6200, total: 8000 },
    ],
  },
];

const CategoryBudgetTable = () => {
  const allMonths = [...new Set(categoryHistory.flatMap(cat => cat.months.map(m => m.month)))].sort();
  const [selectedMonth, setSelectedMonth] = useState(allMonths[allMonths.length - 1]); // latest month by default

  const monthIndex = allMonths.indexOf(selectedMonth);
  const canGoPrev = monthIndex > 0;
  const canGoNext = monthIndex < allMonths.length - 1;

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

  // Current month ke hisaab se data nikaal rahe hain
  const currentData = categoryHistory.map(cat => {
    const monthData = cat.months.find(m => m.month === selectedMonth) || cat.months[cat.months.length - 1];
    return { ...cat, current: monthData };
  });

  const remainingDays = 9; // real app mein yeh selectedMonth ke hisaab se calculate ho sakta hai

  const handlePrevMonth = () => {
    if (canGoPrev) {
      setSelectedMonth(allMonths[monthIndex - 1]);
    }
  };

  const handleNextMonth = () => {
    if (canGoNext) {
      setSelectedMonth(allMonths[monthIndex + 1]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md ring-1 ring-gray-100/60 overflow-hidden">
      {/* Header with navigation */}
      <div className="px-5 sm:px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="font-semibold text-gray-800 text-lg">Category Breakdown</h3>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={handlePrevMonth}
            disabled={!canGoPrev}
            className={`
              p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors
              disabled:opacity-40 disabled:cursor-not-allowed
            `}
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="min-w-[80px] text-center">
            <span className="font-medium text-gray-800 text-base">
              {selectedMonth}
            </span>
          </div>

          <button
            onClick={handleNextMonth}
            disabled={!canGoNext}
            className={`
              p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors
              disabled:opacity-40 disabled:cursor-not-allowed
            `}
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[700px]">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium text-center">Used</th>
              <th className="px-4 py-3 font-medium text-center">Budget</th>
              <th className="px-4 py-3 font-medium text-center">% Used</th>
              <th className="px-4 py-3 font-medium text-right">Remaining</th>
              <th className="px-4 py-3 font-medium text-center">Safe Daily</th>
              <th className="px-4 py-3 font-medium text-center">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {currentData.map((cat) => {
              const { current } = cat;
              const percent = Math.min(100, Math.round((current.used / current.total) * 100));
              const remaining = current.total - current.used;
              const isOver = remaining < 0;
              const isTight = percent >= 80 && !isOver;

              const statusText = isOver ? "Over" : isTight ? "Watch" : "Safe";
              const statusColor = isOver
                ? "text-rose-700 border-rose-300"
                : isTight
                ? " text-amber-700 border-amber-300"
                : " text-emerald-700 border-emerald-300";

              const barColor = isOver ? "bg-rose-500" : isTight ? "bg-amber-500" : `bg-${cat.color}-500`;

              const safeDaily = remaining > 0 && remainingDays > 0
                ? Math.floor(remaining / remainingDays)
                : 0;

              return (
                <tr key={cat.name} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2.5 h-2.5 rounded-full bg-${cat.color}-500`} />
                      {cat.name}
                    </div>
                  </td>

                  <td className="px-4 py-4 text-center text-gray-700">
                    {formatCurrency(current.used)}
                  </td>

                  <td className="px-4 py-4 text-center text-gray-700">
                    {formatCurrency(current.total)}
                  </td>

                  <td className="px-4 py-4">
                    <div className="w-full max-w-[80px] mx-auto">
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${barColor} transition-all duration-700`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="text-xs text-center mt-1 font-medium text-gray-600">
                        {percent}%
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-right font-medium">
                    <span className={isOver ? "text-rose-600" : "text-emerald-700"}>
                      {isOver ? "+" : ""}{formatCurrency(Math.abs(remaining))}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-center font-medium text-gray-700">
                    {remaining > 0 ? formatCurrency(safeDaily) : "—"}
                  </td>

                  <td className="px-4 py-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full  border ${statusColor}`}
                    >
                      {statusText}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-sm text-gray-600 flex flex-wrap justify-between items-center gap-4">
        <div>
          Tracking <span className="font-medium">{categoryHistory.length}</span> categories
        </div>
        <div>
          Budget this month:{" "}
          <span className="font-semibold text-gray-800">
            {formatCurrency(
              currentData.reduce((sum, c) => sum + c.current.total, 0)
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryBudgetTable;