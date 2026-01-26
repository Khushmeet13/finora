import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Calendar,
  Download,
} from "lucide-react";

const BudgetHeader = () => {
  return (
    <div className=" flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      
      {/* Left section */}
      <div className="flex items-center gap-3">
        <Link to="/">
          <button className="p-2 rounded-lg bg-gray-50 hover:bg-slate-100 transition">
            <ArrowLeft className="h-5 w-5 text-black" />
          </button>
        </Link>

        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900">
            Budget Balance
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your remaining balance & allocations
          </p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex flex-wrap items-center gap-2">
        
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-md
          bg-primary text-white text-sm font-medium
          hover:bg-primary/90 transition"
        >
          <Plus className="h-4 w-4" />
          Add Expense
        </button>

        <button
          className="p-2 rounded-md border border-primary/50
          hover:bg-slate-100 transition"
          title="Change Month"
        >
          <Calendar className="h-4 w-4 text-gray-600" />
        </button>

        <button
          className="p-2 rounded-md border border-primary/50
          hover:bg-slate-100 transition"
          title="Export Report"
        >
          <Download className="h-4 w-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default BudgetHeader;
