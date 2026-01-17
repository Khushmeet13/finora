import { useState } from "react";
import {Plus, IndianRupee, ShieldCheck } from "lucide-react";
import IncomeSummaryCards from "../components/incomeDetails/IncomeSummaryCards";
import IncomeSourcesPie from "../components/incomeDetails/IncomeSourcesPie";
import IncomeVsExpensesComparison from "../components/incomeDetails/IncomeVsExpensesComparison";
import RecentIncomeTransactions from "../components/incomeDetails/RecentIncomeTransactions";
import IncomePageHeader from "../components/incomeDetails/IncomePageHeader";
import SmartInsights from "../components/incomeDetails/SmartInsights";
import SalaryStructureAndDeductions from "../components/incomeDetails/SalaryStructureAndDeductions";
import IncomeTrendChart from "../components/incomeDetails/IncomeTrendChart";
import QuickActions from "../components/incomeDetails/QuickActions";


export default function IncomeDetails() {
  const [openAddIncome, setOpenAddIncome] = useState(false);


  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="max-w-8xl mx-auto  space-y-10">
        {/* ================= HEADER ================= */}
        <IncomePageHeader />

        {/* ================= TOP SUMMARY CARDS ================= */}
        <IncomeSummaryCards />

        {/* ================= INSIGHTS BANNER ================= */}
        <SmartInsights />

        {/* ================= SALARY BREAKDOWN + DEDUCTIONS ================= */}
        <SalaryStructureAndDeductions />

        {/* ================= MONTHLY TREND + SOURCES ================= */}
        <div className="grid gap-6 lg:grid-cols-2 items-stretch">
          <IncomeTrendChart />
          <IncomeSourcesPie />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <IncomeVsExpensesComparison />
          <RecentIncomeTransactions />
        </div>

        {/* ================= ACTIONS ================= */}
      <QuickActions />


        <button
          onClick={() => setOpenAddIncome(true)}
          className="
            fixed bottom-6 right-6 z-50
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
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Add Income</span>
        </button>

        {openAddIncome && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-background shadow-xl p-6 space-y-6">

              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Add Income</h2>
                <button
                  onClick={() => setOpenAddIncome(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              {/* Form */}
              <div className="space-y-4">
                {/* Amount */}
                <div>
                  <label className="text-sm font-medium">Amount</label>
                  <div className="flex items-center gap-2 mt-1 border rounded-lg px-3 py-2">
                    <IndianRupee className="h-4 w-4 text-muted-foreground" />
                    <input
                      type="number"
                      placeholder="Enter amount"
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <input
                    type="date"
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                  />
                </div>

                {/* Source */}
                <div>
                  <label className="text-sm font-medium">Source</label>
                  <select className="w-full mt-1 border rounded-lg px-3 py-2">
                    <option>Salary</option>
                    <option>Freelance</option>
                    <option>Business</option>
                    <option>Investment</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <input
                    type="text"
                    placeholder="Optional note"
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                  />
                </div>

                {/* Recurring */}
                <div>
                  <label className="text-sm font-medium">Recurring</label>
                  <select className="w-full mt-1 border rounded-lg px-3 py-2">
                    <option>No</option>
                    <option>Monthly</option>
                    <option>Bi-Weekly</option>
                    <option>Custom</option>
                  </select>
                </div>
              </div>

              {/* Bank Import (Future Ready) */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <p className="text-sm text-muted-foreground">
                  Import income automatically from linked bank accounts
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setOpenAddIncome(false)}
                  className="flex-1 rounded-xl border py-2"
                >
                  Cancel
                </button>
                <button
                  className="flex-1 rounded-xl bg-primary text-white py-2 hover:bg-primary/90 transition"
                >
                  Save Income
                </button>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
}