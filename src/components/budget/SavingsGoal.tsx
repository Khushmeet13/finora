import { motion } from "framer-motion";
import { PiggyBank, ArrowRight, TrendingUp } from "lucide-react";

export default function SavingsGoal() {
  // Sample data (real app mein user ke actual savings goal se aayega)
  const currentSavings = 28500;
  const savingsGoal = 100000;
  const goalProgress = (currentSavings / savingsGoal) * 100;
  const monthsLeft = 8; // estimated

  const potentialImpact = [
    {
      category: "Shopping",
      reduction: 1000,
      monthlyExtraToSavings: 1000,
      impactMonthsFaster: 2,
    },
    {
      category: "Entertainment",
      reduction: 500,
      monthlyExtraToSavings: 500,
      impactMonthsFaster: 1,
    },
  ];

  return (
    <div className="mt-10">
      <div className="flex items-center gap-3 mb-5">
        <PiggyBank className="text-emerald-600" size={26} />
        <h2 className="text-xl font-bold">Impact on Savings Goal</h2>
      </div>

      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-6 shadow-sm">
        {/* Current Goal Status */}
        <div className="mb-6">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-sm text-emerald-700 font-medium">Current Savings</p>
              <p className="text-2xl font-bold">₹{currentSavings.toLocaleString()}</p>
            </div>
            <p className="text-sm text-gray-600">
              Goal: <span className="font-semibold">₹{savingsGoal.toLocaleString()}</span>
            </p>
          </div>

          <div className="h-3 bg-emerald-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${goalProgress}%` }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="h-full bg-emerald-600 rounded-full"
            />
          </div>

          <p className="text-xs text-emerald-700 mt-2 text-center font-medium">
            ≈ {monthsLeft} months left at current pace
          </p>
        </div>

        {/* Potential Improvements */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-emerald-800">
            Small changes → Goal jaldi complete!
          </p>

          {potentialImpact.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-4 bg-white/60 p-4 rounded-xl border border-emerald-100"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                <TrendingUp size={20} />
              </div>

              <div className="flex-1">
                <p className="font-medium">
                  {item.category} ko ₹{item.reduction.toLocaleString()} kam karo
                </p>
                <p className="text-sm text-emerald-700 mt-0.5">
                  → Har mahine ₹{item.monthlyExtraToSavings.toLocaleString()} extra savings
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-bold text-emerald-600">
                  {item.impactMonthsFaster} months faster
                </p>
                <div className="flex items-center gap-1 text-xs text-emerald-700">
                  <ArrowRight size={14} />
                  Goal closer!
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}