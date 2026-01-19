import { motion } from "framer-motion";
import { CalendarDays, Clock, AlertCircle } from "lucide-react";

export default function DaysLeftIndicator() {
  // Current date: January 19, 2026 (example)
  const today = new Date(2026, 0, 19); // Jan 19, 2026
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const daysLeft = daysInMonth - today.getDate();

  const totalBudget = 20000;
  const spent = 16280;
  const remaining = totalBudget - spent;

  const expectedDaily = totalBudget / daysInMonth;
  const actualDaily = spent / (daysInMonth - daysLeft);
  const paceStatus = actualDaily > expectedDaily ? "fast" : actualDaily < expectedDaily * 0.7 ? "slow" : "good";

  const getColor = () => {
    if (paceStatus === "fast") return "text-rose-600 bg-rose-50";
    if (paceStatus === "slow") return "text-emerald-600 bg-emerald-50";
    return "text-blue-600 bg-blue-50";
  };

  return (
    <div className="mt-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`
          rounded-2xl border p-6 shadow-sm
          ${getColor()}
        `}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <CalendarDays size={24} />
            <div>
              <h3 className="font-semibold text-lg">{daysLeft} days left</h3>
              <p className="text-sm opacity-80">in January 2026</p>
            </div>
          </div>

          {paceStatus === "fast" && (
            <div className="flex items-center gap-1.5 text-sm font-medium text-rose-700">
              <AlertCircle size={16} />
              Spending fast!
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>Remaining amount:</span>
            <span className="font-bold">₹{remaining.toLocaleString()}</span>
          </div>

          <div className="h-2.5 bg-white/40 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(spent / totalBudget) * 100}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={`h-full ${
                paceStatus === "fast" ? "bg-rose-500" :
                paceStatus === "slow" ? "bg-emerald-500" : "bg-blue-500"
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Expected daily</p>
              <p className="font-medium">₹{Math.round(expectedDaily).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Actual daily avg</p>
              <p className={`font-medium ${paceStatus === "fast" ? "text-rose-700" : ""}`}>
                ₹{Math.round(actualDaily).toLocaleString()}
              </p>
            </div>
          </div>

          {paceStatus === "fast" && daysLeft <= 10 && (
            <div className="mt-3 p-3 bg-white/50 rounded-lg text-sm">
              <strong>Warning:</strong> Agar same speed chali to last week mein paise khatam ho sakte hain
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}