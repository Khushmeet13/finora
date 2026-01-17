import { useState } from "react";
import { ArrowLeft, Calendar, Filter, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom"; // or your router

// Available months (you can generate dynamically)
const months = [
  { value: "2026-01", label: "January 2026" },
  { value: "2025-12", label: "December 2025" },
  { value: "2025-11", label: "November 2025" },
  // ... add more as needed
];

const sources = ["All Sources", "Full-time Salary", "Freelance Projects", "Stock Dividends", "Rental Income", "Bonus", "Other"];

export default function IncomePageHeader() {
  const [selectedMonth, setSelectedMonth] = useState("2026-01");
  const [selectedSource, setSelectedSource] = useState("All Sources");
  const [isCustomRangeOpen, setIsCustomRangeOpen] = useState(false);

  // Placeholder handlers - connect to your state/context
  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
    // Trigger data refetch/filter
  };

  const handleSourceChange = (value: string) => {
    setSelectedSource(value);
    // Trigger filter
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
        {/* <div className="flex items-center gap-4">
          <Link to="/">
            <button className="p-3 rounded-md bg-gray-50 hover:bg-muted transition-shadow shadow-sm">
              <ArrowLeft className="h-4 w-4" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Income Overview</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Track your earnings, sources, and growth at a glance
            </p>
          </div>
        </div> */}
        
      {/* Left: Back + Title */}
      <div className="flex items-center gap-4">
        <Link to="/">
          <button className="p-3 rounded-xl bg-muted/50 hover:bg-muted transition-all shadow-sm hover:shadow">
            <ArrowLeft className="h-5 w-5" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Income Overview</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Track your earnings, sources, and growth at a glance
          </p>
        </div>
      </div>

      {/* Top-Right: Filters & Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Month Selector */}
        <div className="relative">
          <select
            value={selectedMonth}
            onChange={(e) => handleMonthChange(e.target.value)}
            className="appearance-none bg-background border border-primary/20 rounded-xl pl-4 pr-10 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer hover:border-primary/40 transition-all"
          >
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        </div>

        {/* Source Filter */}
        <div className="relative">
          <select
            value={selectedSource}
            onChange={(e) => handleSourceChange(e.target.value)}
            className="appearance-none bg-background border border-primary/20 rounded-xl pl-4 pr-10 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer hover:border-primary/40 transition-all"
          >
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        </div>

        {/* Custom Date Range Toggle */}
        <button
          onClick={() => setIsCustomRangeOpen(!isCustomRangeOpen)}
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-background border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all text-sm font-medium"
        >
          <Calendar className="h-4 w-4" />
          Custom Range
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isCustomRangeOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Optional: Custom Range Picker (Popover or Modal) */}
        {isCustomRangeOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-background border border-primary/20 rounded-xl shadow-2xl p-5 z-10">
            <p className="text-sm font-medium mb-4">Select Date Range</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">From</label>
                <input
                  type="date"
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  defaultValue="2025-12-01"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">To</label>
                <input
                  type="date"
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  defaultValue="2026-01-05"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setIsCustomRangeOpen(false)}
                className="px-4 py-2 text-sm rounded-lg hover:bg-muted transition"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition">
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}