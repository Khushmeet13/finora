const BudgetProgress = () => {
  const totalBudget = 50000;
  const spent = 32400;
  const remaining = totalBudget - spent;
  const spentPercent = Math.round((spent / totalBudget) * 100);
  const remainingPercent = 100 - spentPercent;

  const formatCurrency = (amount: number) =>
    `₹${amount.toLocaleString("en-IN")}`;

  return (
    <div className="bg-white rounded-xl p-6 shadow-md ring-1 ring-gray-100/70">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-gray-800 text-lg tracking-tight">
            Monthly Budget
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            Feb 2025 • {formatCurrency(totalBudget)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xl font-bold text-emerald-700">
            {formatCurrency(remaining)}
          </p>
          <p className="text-xs text-emerald-600 font-medium">remaining</p>
        </div>
      </div>

      {/* Main Progress Bar */}
      <div className="relative mb-4">
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/50 transition-all duration-1000 ease-out"
            style={{ width: `${spentPercent}%` }}
          />
        </div>

        {/* Percentage label on the bar */}
        {spentPercent > 8 && (
          <div
            className="absolute top-0 bottom-0 left-[calc(100%-12.5rem)] flex items-center pointer-events-none"
            style={{ transform: `translateX(-${spentPercent < 92 ? 0 : 100}%)` }}
          >
            <span className="text-xs font-bold text-white drop-shadow-md bg-black/40 px-1.5 py-0.5 rounded">
              {spentPercent}%
            </span>
          </div>
        )}
      </div>

      {/* Two-column breakdown */}
      <div className="grid grid-cols-2 gap-4 text-sm mt-5">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <div>
            <p className="font-medium text-gray-800">
              Spent • {formatCurrency(spent)}
            </p>
            <p className="text-gray-500">{spentPercent}% used</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-gray-300" />
          <div>
            <p className="font-medium text-gray-800">
              Left • {formatCurrency(remaining)}
            </p>
            <p className="text-gray-500">{remainingPercent}% available</p>
          </div>
        </div>
      </div>

      {/* Optional subtle warning / status */}
      {spentPercent > 80 && (
        <div className="mt-5 pt-4 border-t border-gray-100 text-xs text-amber-700 flex items-center gap-2">
          <span className="text-amber-500 text-base">⚠</span>
          You're close to your monthly limit — {remainingPercent}% remaining
        </div>
      )}
    </div>
  );
};

export default BudgetProgress;