import { IndianRupee, Pencil, TrendingUp } from "lucide-react";
import BudgetSummary from "../components/remainingBudget/BudgetSummary";
import BudgetProgress from "../components/remainingBudget/BudgetProgress";
import CategoryBudget from "../components/remainingBudget/CategoryBudget";
import DailyLimit from "../components/remainingBudget/DailyLimit";
import Alerts from "../components/remainingBudget/Alerts";
import SpendingTrend from "../components/remainingBudget/SpendingTrend";
import QuickActions from "../components/remainingBudget/QuickActions";
import BudgetHeader from "../components/remainingBudget/BudgetHeader";
import { useState } from "react";

export default function BudgetDetails() {
    const [openEditBudget, setOpenEditBudget] = useState(false);
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">

            <BudgetHeader />
            <BudgetSummary />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <BudgetProgress />
                <DailyLimit />
            </div>

            <CategoryBudget />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Alerts />
                <SpendingTrend />
            </div>
            <QuickActions />

            <button
                onClick={() => setOpenEditBudget(true)}
                className="
                    fixed bottom-2 right-5 z-50
                    flex items-center gap-3

                    rounded-full
                    bg-primary text-white
                    shadow-xl

                    px-5 py-3
                    text-sm font-medium

                    hover:shadow-2xl hover:scale-105
                    active:scale-95
                    transition-all duration-300
                "
            >
                <Pencil className="h-5 w-5" />
                <span className="hidden sm:inline">Edit Budget</span>
            </button>

            {openEditBudget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="w-full max-w-xl rounded-2xl bg-background shadow-xl p-6 space-y-6">

                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Edit Monthly Budget</h2>
                            <button
                                onClick={() => setOpenEditBudget(false)}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Form */}
                        <div className="space-y-4">

                            {/* Total Budget */}
                            <div>
                                <label className="text-sm font-medium">Total Monthly Budget</label>
                                <div className="flex items-center gap-2 mt-1 border rounded-lg px-3 py-2">
                                    <IndianRupee className="h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="number"
                                        placeholder="Enter total budget"
                                        className="w-full bg-transparent outline-none"
                                    />
                                </div>
                            </div>

                            {/* Month */}
                            <div>
                                <label className="text-sm font-medium">Month</label>
                                <input
                                    type="month"
                                    className="w-full mt-1 border rounded-lg px-3 py-2"
                                />
                            </div>

                            {/* Category Budgets */}
                            <div className="space-y-3">
                                <p className="text-sm font-medium">Category Allocation</p>

                                {["Food", "Travel", "Shopping"].map((cat) => (
                                    <div key={cat} className="flex items-center gap-3">
                                        <span className="w-24 text-sm text-muted-foreground">
                                            {cat}
                                        </span>
                                        <div className="flex-1 flex items-center gap-2 border rounded-lg px-3 py-2">
                                            <IndianRupee className="h-4 w-4 text-muted-foreground" />
                                            <input
                                                type="number"
                                                placeholder="Amount"
                                                className="w-full bg-transparent outline-none"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Rollover Option */}
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border">
                                <input type="checkbox" className="h-4 w-4" />
                                <p className="text-sm text-muted-foreground">
                                    Carry forward remaining budget to next month
                                </p>
                            </div>
                        </div>

                        {/* Smart Insight */}
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                            <TrendingUp className="h-5 w-5 text-emerald-600" />
                            <p className="text-sm text-emerald-700">
                                Increasing budget by 5% keeps you safe based on last month’s spend
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={() => setOpenEditBudget(false)}
                                className="flex-1 rounded-xl border py-2"
                            >
                                Cancel
                            </button>
                            <button
                                className="flex-1 rounded-xl bg-slate-900 text-white py-2 hover:bg-slate-800 transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}
