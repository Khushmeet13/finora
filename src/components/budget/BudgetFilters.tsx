import { useState } from "react";
import { ChevronDown, Filter, Calendar, ListFilter } from "lucide-react";

export default function BudgetFilters() {
  const [selectedMonth, setSelectedMonth] = useState("January 2026");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [viewType, setViewType] = useState<"all" | "expenses" | "income">("all");

  const months = [
    "January 2026", "December 2025", "November 2025", "October 2025",
    // ... more months as needed
  ];

  const categories = [
    "All Categories",
    "Food & Dining",
    "Rent & Bills",
    "Shopping",
    "Transport",
    "Entertainment",
    "Health & Fitness",
  ];

  return (
    <div className="bg-white border-b sticky top-0 z-10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Month Switcher */}
          <div className="relative min-w-[180px]">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="
                w-full appearance-none bg-white border border-gray-300 
                rounded-lg px-4 py-2.5 pr-10 text-sm font-medium
                focus:outline-none focus:ring-2 focus:ring-indigo-500
              "
            >
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          {/* Category Filter */}
          <div className="relative min-w-[200px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="
                w-full appearance-none bg-white border border-gray-300 
                rounded-lg px-4 py-2.5 pr-10 text-sm font-medium
                focus:outline-none focus:ring-2 focus:ring-indigo-500
              "
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          {/* View Type Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[
              { id: "all", label: "All", icon: <ListFilter size={16} /> },
              { id: "expenses", label: "Expenses", icon: null },
              { id: "income", label: "Income", icon: null },
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setViewType(option.id as any)}
                className={`
                  px-4 py-1.5 text-sm font-medium rounded-md transition-all
                  ${viewType === option.id
                    ? "bg-white shadow-sm text-indigo-700"
                    : "text-gray-600 hover:text-gray-900"}
                `}
              >
                {option.icon && <span className="mr-1.5">{option.icon}</span>}
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}