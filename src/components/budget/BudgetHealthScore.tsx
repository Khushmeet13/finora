import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";

export default function BudgetHealthScore() {
  // Sample calculation (out of 100)
  const score = 78; // Based on factors like % spent, categories over, consistency
  const status = score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Improvement";
  const color = score >= 80 ? "emerald" : score >= 60 ? "amber" : "rose";

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <HeartPulse size={22} className="text-red-600" />
        Budget Health Score
      </h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative rounded-2xl p-6 border shadow-sm bg-gradient-to-br from-white to-gray-50"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="3"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: score / 100 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={`url(#gradient-${color})`}
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={color === "emerald" ? "#10b981" : color === "amber" ? "#f59e0b" : "#ef4444"} />
                  <stop offset="100%" stopColor={color === "emerald" ? "#059669" : color === "amber" ? "#d97706" : "#dc2626"} />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold">{score}/100</span>
            </div>
          </div>
        </div>

        <p className={`text-center text-lg font-semibold text-${color}-600`}>{status}</p>

        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          <li>👍 Under budget in 4/6 categories</li>
          <li>⚠️ Overspent in Entertainment</li>
          <li>📈 Consistent last month</li>
        </ul>
      </motion.div>
    </div>
  );
}