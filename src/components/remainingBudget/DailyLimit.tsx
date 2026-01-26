const DailyLimit = () => {
  // These would typically come from props or context/state
  const remainingBudget = 17600;
  const daysLeft = 9;

  const safeDaily = Math.floor(remainingBudget / daysLeft);
  const formatCurrency = (amt: number) => `₹${amt.toLocaleString("en-IN")}`;

  // Optional: show buffer/warning logic
  const isTight = safeDaily < 1000;
  const isVeryTight = safeDaily < 500;

  return (
    <div
      className={`
        bg-white rounded-xl p-6 shadow-md ring-1 ring-gray-100
        transition-all duration-300 
        ${isVeryTight ? "border-l-4 border-rose-500" : isTight ? "border-l-4 border-amber-500" : ""}
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-gray-800 text-lg tracking-tight">
            Safe Daily Limit
          </p>

          <h2 className="mt-2 text-3xl sm:text-3xl font-semibold tracking-tight text-emerald-700">
            {formatCurrency(safeDaily)}
          </h2>

          <p className="mt-1.5 text-xs text-gray-500">
            Recommended max spend per day
          </p>
        </div>

        {/* Small status indicator */}
        <div className="flex flex-col items-end gap-1">
          <div
            className={`
              px-2.5 py-1 rounded-full text-xs font-medium
              ${isVeryTight
                ? "bg-rose-100 text-rose-700"
                : isTight
                ? "bg-amber-100 text-amber-700"
                : "bg-emerald-100 text-emerald-700"}
            `}
          >
            {isVeryTight ? "Very tight" : isTight ? "Tight" : "Comfortable"}
          </div>

          <p className="text-xs text-gray-400 mt-1">
            {daysLeft} days left
          </p>
        </div>
      </div>

      {/* Subtle breakdown */}
      <div className="mt-5 pt-4 border-t border-gray-100 text-sm grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600 font-medium">
            {formatCurrency(remainingBudget)} remaining
          </p>
          <p className="text-xs text-gray-500">Total left</p>
        </div>

        <div className="text-right">
          <p className="text-gray-600 font-medium">
            ~{formatCurrency(safeDaily * daysLeft)} if followed
          </p>
          <p className="text-xs text-gray-500">Projected end</p>
        </div>
      </div>

      {/* Tiny progress hint */}
      {daysLeft > 0 && (
        <div className="mt-4">
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-1000"
              style={{ width: `${(remainingBudget / (remainingBudget + 1)) * 100}%` }} // dummy ~100%
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyLimit;