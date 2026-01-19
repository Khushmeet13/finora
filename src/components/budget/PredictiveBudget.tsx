import { motion } from "framer-motion";
import { AlertTriangle, Calendar, TrendingUp } from "lucide-react";

export default function PredictiveBudget() {
  // Sample data (Jan 19, 2026 → 31 days in Jan)
  const daysPassed = 19;
  const daysTotal = 31;
  const daysLeft = daysTotal - daysPassed;
  const totalBudget = 20000;
  const spentSoFar = 16280; // High spending
  const dailyRate = spentSoFar / daysPassed;
  const projectedSpent = spentSoFar + (dailyRate * daysLeft);
  const willExceed = projectedSpent > totalBudget;
  const exceedDate = new Date(2026, 0, 19 + Math.ceil((totalBudget - spentSoFar) / dailyRate));

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <TrendingUp size={22} className="text-indigo-600" />
        Predictive Budget Forecast
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`
          rounded-2xl p-6 border shadow-sm
          ${willExceed ? "bg-rose-50 border-rose-200" : "bg-emerald-50 border-emerald-200"}
        `}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-full bg-white/50 flex-shrink-0">
            <Calendar size={24} className={willExceed ? "text-rose-600" : "text-emerald-600"} />
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              {willExceed ? "Warning: Budget might run out early!" : "On track for the month"}
            </h3>
            <p className="text-sm mt-1 opacity-90">
              Is speed se chale toh {exceedDate.toLocaleDateString("en-IN", { day: "numeric", month: "long" })} tak budget khatam ho jayega.
            </p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Current daily average:</span>
            <span className="font-medium">₹{Math.round(dailyRate).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Projected total spend:</span>
            <span className={`font-medium ${willExceed ? "text-rose-600" : "text-emerald-600"}`}>
              ₹{Math.round(projectedSpent).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-4 h-3 rounded-full overflow-hidden bg-gray-100">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(spentSoFar / totalBudget) * 100}%` }}
            className={`h-full ${willExceed ? "bg-rose-500" : "bg-emerald-500"}`}
          />
        </div>

        {willExceed && (
          <p className="text-xs text-rose-600 mt-3 flex items-center gap-1.5 font-medium">
            <AlertTriangle size={14} />
            {/* Reduce daily spending by ₹{Math.round(dailyRate - (remaining / daysLeft))} to stay under budget */}
          </p>
        )}
      </motion.div>
    </div>
  );
}