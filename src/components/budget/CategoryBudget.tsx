import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

type Category = {
  name: string;
  allocated: number;
  spent: number;
  color: string;
};

export default function CategoryBudget() {
  // Sample data - you would get this from your state / API
  const categories: Category[] = [
    { name: "Food & Dining", allocated: 6000, spent: 4200, color: "emerald" },
    { name: "Rent & Bills", allocated: 8000, spent: 8000, color: "indigo" },
    { name: "Shopping", allocated: 3000, spent: 2850, color: "violet" },
    { name: "Transport", allocated: 2000, spent: 1450, color: "amber" },
    { name: "Entertainment", allocated: 1500, spent: 1680, color: "rose" },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4 tracking-tight">Category Breakdown</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((cat, i) => {
          const percentage = (cat.spent / cat.allocated) * 100;
          const remaining = cat.allocated - cat.spent;

          let status = "normal";
          let badgeColor = "";
          let progressColor = `bg-${cat.color}-500`;

          if (percentage >= 100) {
            status = "over";
            badgeColor = "bg-red-100 text-red-700 border-red-300";
            progressColor = "bg-red-500";
          } else if (percentage >= 80) {
            status = "warning";
            badgeColor = "bg-amber-100 text-amber-800 border-amber-300";
            progressColor = "bg-amber-500";
          }

          return (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className={`
                bg-white border rounded-lg p-4 shadow-md hover:shadow-md transition-all
                ${status === "over" ? "border-red-200" : ""}
                ${status === "warning" ? "border-amber-200" : ""}
                h-full flex flex-col
              `}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-gray-800">{cat.name}</h3>

                {(status === "warning" || status === "over") && (
                  <div
                    className={`text-xs px-2.5 py-1 rounded-full border font-medium flex items-center gap-1 ${badgeColor}`}
                  >
                    <AlertCircle size={13} />
                    {status === "over" ? "Limit crossed" : "Careful"}
                  </div>
                )}
              </div>

              {/* Amounts */}
              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Allocated</span>
                  <span className="font-medium">₹{cat.allocated.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Spent</span>
                  <span className={`font-medium ${status === "over" ? "text-red-600" : ""}`}>
                    ₹{cat.spent.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-600">Remaining</span>
                  <span className={remaining < 0 ? "text-red-600" : "text-emerald-600"}>
                    ₹{Math.abs(remaining).toLocaleString("en-IN")}
                    {remaining < 0 ? " over" : ""}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-auto">
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(percentage, 100)}%` }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 + i * 0.1 }}
                    className={`h-full rounded-full ${progressColor}`}
                  />
                </div>

                <div className="mt-1.5 flex justify-between text-xs text-gray-500">
                  <span>{percentage.toFixed(0)}%</span>
                  <span>used</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}