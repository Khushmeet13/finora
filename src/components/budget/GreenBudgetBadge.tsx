import { motion } from "framer-motion";
import { Leaf, CheckCircle2 } from "lucide-react";

export default function GreenBudgetBadge() {
  // Sample: User under budget for 3 months
  const achieved = true; // From user data
  const streak = 3;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Leaf size={22} className="text-emerald-600" />
        Green Budget Badge
      </h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`
          rounded-2xl p-6 border shadow-sm text-center
          ${achieved ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border-gray-200"}
        `}
      >
        <div className="mx-auto w-24 h-24 rounded-full bg-white/50 flex items-center justify-center mb-4">
          <motion.div
            animate={achieved ? { rotate: [0, 10, -10, 0], transition: { duration: 0.5 } } : {}}
          >
            <CheckCircle2 size={48} className={achieved ? "text-emerald-600" : "text-gray-400"} />
          </motion.div>
        </div>

        <h3 className="font-semibold text-lg mb-2">
          {achieved ? "Unlocked! 🌟" : "Locked"}
        </h3>

        <p className="text-sm opacity-90 mb-3">
          {achieved
            ? `Congrats! ${streak} months continuously under budget.`
            : "Stay under budget for 3 months to unlock this eco-friendly badge."}
        </p>

        {achieved && (
          <p className="text-xs text-emerald-700 font-medium flex items-center justify-center gap-1.5">
            <Leaf size={14} />
            You're saving money & the planet (less waste!)
          </p>
        )}
      </motion.div>
    </div>
  );
}