"use client";

import { useState } from "react";
import { ChevronDown, Calendar, Filter, ListFilter } from "lucide-react";

export default function BudgetFilters() {
  const [selectedMonth, setSelectedMonth] = useState("January 2026");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [viewType, setViewType] = useState<"all" | "expenses" | "income">("all");

  const months = [
    "January 2026",
    "December 2025",
    "November 2025",
    "October 2025",
    "September 2025",
    // ... aur months add kar sakte ho
  ];

  const categories = [
    "All Categories",
    "Food & Dining",
    "Rent & Bills",
    "Shopping",
    "Transport",
    "Entertainment",
    "Health & Fitness",
    "Salary",
    "Freelance",
    "Investment Return",
  ];

  const viewOptions = [
    { value: "all", label: "All Transactions", icon: <ListFilter size={16} /> },
    { value: "expenses", label: "Only Expenses", icon: null },
    { value: "income", label: "Only Income", icon: null },
  ];

  // Common select styles
  const selectBaseStyles = `
    w-full appearance-none bg-white border border-primary/20
    rounded-md px-4 py-2 pr-10 text-sm font-medium
    focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
    transition-all cursor-pointer
  `;

  return (
    <div className="bg-white  sticky top-0 z-10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto ">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          {/* 1. Month Selector */}
          <div className="relative min-w-[190px]">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className={selectBaseStyles}
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <Calendar
              className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>

          {/* 2. Category Filter */}
          <div className="relative min-w-[220px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={selectBaseStyles}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <Filter
              className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>

          {/* 3. View Type → Ab Dropdown */}
          <div className="relative min-w-[200px]">
            <select
              value={viewType}
              onChange={(e) => setViewType(e.target.value as "all" | "expenses" | "income")}
              className={selectBaseStyles}
            >
              {viewOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ListFilter
              className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
}