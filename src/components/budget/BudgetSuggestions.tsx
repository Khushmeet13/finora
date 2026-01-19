import { motion } from "framer-motion";
import { Lightbulb, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

export default function BudgetSuggestions() {
  // Yeh data real app mein AI/backend se aayega
  const suggestions = [
    {
      type: "increase",
      title: "Food & Dining budget tight lag raha hai",
      description: "Last month ₹5,400 spend hue (90% of ₹6,000). Is month already ₹5,200 ho chuke hain.",
      suggestion: "Budget ko ₹7,000–7,500 tak badha sakte ho?",
      icon: <TrendingUp size={20} />,
      color: "bg-amber-50 border-amber-200 text-amber-800",
    },
    {
      type: "reduce",
      title: "Travel budget almost untouched",
      description: "Last 3 months average sirf ₹420/month spend hua (₹2,000 allocated tha).",
      suggestion: "Is category ko ₹1,200 tak reduce kar sakte ho — extra paise Entertainment ya Savings mein daal do.",
      icon: <TrendingDown size={20} />,
      color: "bg-emerald-50 border-emerald-200 text-emerald-800",
    },
    {
      type: "warning",
      title: "Entertainment already over",
      description: "₹1,680 spend ho chuke hain ₹1,500 ke budget ke against.",
      suggestion: "Agla mahina isko ₹1,800–2,000 karna better hoga ya strict tracking rakho.",
      icon: <AlertTriangle size={20} />,
      color: "bg-red-50 border-red-200 text-red-800",
    },
  ];

  return (
    <div className="mt-10">
      <div className="flex items-center gap-3 mb-5">
        <Lightbulb className="text-yellow-600" size={24} />
        <h2 className="text-xl font-bold">Smart Budget Suggestions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {suggestions.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`
              p-5 rounded-2xl border shadow-sm hover:shadow-md transition-all
              ${item.color}
            `}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="mt-1">{item.icon}</div>
              <h3 className="font-semibold">{item.title}</h3>
            </div>

            <p className="text-sm opacity-90 mb-3">{item.description}</p>

            <div className="bg-white/60 rounded-lg p-3 text-sm font-medium">
              💡 {item.suggestion}
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center italic">
        Suggestions current & previous month ke data pe based hain
      </p>
    </div>
  );
}