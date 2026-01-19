import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

export default function SpendingPersonality() {
  // Sample insights (from data analysis)
  const insights = [
    "You overspend on weekends (₹2,800 avg vs ₹1,200 weekdays)",
    "Food is your biggest impulse category (45% unplanned)",
    "Savings spike mid-month after salary",
    "Rarely exceed on essentials like Rent",
  ];

  const personalityType = "Weekend Spender"; // Based on patterns

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <BrainCircuit size={22} className="text-purple-600" />
        Your Spending Personality
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 border shadow-sm bg-gradient-to-br from-purple-50 to-violet-50"
      >
        <h3 className="text-lg font-semibold mb-3 text-purple-800">
          {personalityType}
        </h3>

        <ul className="space-y-3 text-sm">
          {insights.map((insight, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-2"
            >
              <span className="mt-0.5 text-purple-600">•</span>
              {insight}
            </motion.li>
          ))}
        </ul>

        <div className="mt-5 p-3 bg-white/50 rounded-lg text-sm text-purple-700 font-medium">
          💡 Tip: Weekend pe shopping alerts set karo to control karo
        </div>
      </motion.div>
    </div>
  );
}