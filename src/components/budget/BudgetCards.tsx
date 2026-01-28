import { motion } from "framer-motion";
import BudgetFilters from "./BudgetFilters";

export default function BudgetCards() {

  const stats = [
    {
      title: "Total Budget",
      amount: 20000,
      color: "bg-primary/10 text-primary",
      progress: 100,
      extra: "Monthly limit",
    },
    {
      title: "Spent",
      amount: 13500,
      color: "bg-rose-50 text-rose-700",
      progress: 67.5, // (13500 / 20000) * 100
      extra: "This month",
    },
    {
      title: "Remaining",
      amount: 6500,
      color: "bg-emerald-50 text-emerald-700",
      progress: 32.5,
      extra: "Left to spend",
      isPositive: true,
    },
  ];

  return (
    <div className="space-y-5">
      {/* Header - compact */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Budget Overview</h2>
          <p className="text-sm text-muted-foreground">
            See where your money stands this month.
          </p>
        </div>

        {/* <div className="flex items-center gap-1.5 bg-white border rounded-full px-3 py-1.5 shadow-sm">
          <button
            onClick={() => setMonth("December 2024")}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft size={16} className="text-gray-500" />
          </button>
          <span className="text-sm font-medium min-w-[110px] text-center">
            {month}
          </span>
          <button
            onClick={() => setMonth("February 2025")}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight size={16} className="text-gray-500" />
          </button>
        </div> */}
        <BudgetFilters />
      </div>

      {/* Compact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className={`
              bg-white border rounded-lg p-4 shadow-md hover:shadow-md transition-shadow
              ${stat.isPositive ? "border-emerald-200" : ""}
            `}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-xs text-gray-500 font-medium">{stat.title}</p>
                <p className="text-xl font-bold mt-0.5">
                  ₹{stat.amount.toLocaleString("en-IN")}
                </p>
              </div>

              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stat.color}`}>
                {stat.extra}
              </span>
            </div>

            {/* Mini Progress Bar */}
            <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stat.progress}%` }}
                transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                className={`h-full rounded-full ${stat.title === "Spent"
                    ? "bg-rose-500"
                    : stat.title === "Remaining"
                      ? "bg-emerald-500"
                      : "bg-primary"
                  }`}
              />
            </div>

            {/* Extra small info line */}
            <div className="mt-2 text-xs text-gray-500 flex justify-between">
              <span>
                {stat.title === "Spent"
                  ? `${((stat.amount / 20000) * 100).toFixed(0)}% used`
                  : stat.title === "Remaining"
                    ? `${((stat.amount / 20000) * 100).toFixed(0)}% left`
                    : "Fixed"}
              </span>
              {stat.isPositive && (
                <span className="text-emerald-600 font-medium">On track ✓</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}