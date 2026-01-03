import { CheckCircle2, TrendingUp } from "lucide-react";

interface Props {
  totalTransactions: number;
  declinedTransactions: number;
  income: number;
  expenses: number;
}

export const TransactionHealthMeter = ({
  totalTransactions,
  declinedTransactions,
  income,
  expenses,
}: Props) => {
  // Health logic
  const declinedRate = (declinedTransactions / totalTransactions) * 100;
  const balanceRatio = income / (expenses || 1);

  let healthScore = 100;
  if (declinedRate > 10) healthScore -= 20;
  if (balanceRatio < 1.1) healthScore -= 20;

  healthScore = Math.max(50, Math.round(healthScore));

  const status =
    healthScore >= 85
      ? "Excellent"
      : healthScore >= 65
      ? "Moderate"
      : "Needs attention";

  const color =
    healthScore >= 85
      ? "text-emerald-600"
      : healthScore >= 65
      ? "text-amber-600"
      : "text-red-600";

  const ringColor =
    healthScore >= 85
      ? "stroke-emerald-500"
      : healthScore >= 65
      ? "stroke-amber-500"
      : "stroke-red-500";

  return (
    <div className="relative bg-white rounded-xl p-6 shadow-sm border">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Transaction health
          </h3>
          <p className="text-xs text-muted-foreground">
            Overall financial stability
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            healthScore >= 85
              ? "bg-emerald-100 text-emerald-700"
              : healthScore >= 65
              ? "bg-amber-100 text-amber-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Main */}
      <div className="flex items-center gap-6">
        {/* Circular Meter */}
        <div className="relative h-24 w-24">
          <svg className="h-full w-full -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              strokeWidth="8"
              fill="none"
              className="stroke-slate-100"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              strokeWidth="8"
              fill="none"
              strokeDasharray={251}
              strokeDashoffset={251 - (251 * healthScore) / 100}
              className={`${ringColor} transition-all duration-700`}
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className={`text-xl font-bold ${color}`}>
              {healthScore}%
            </p>
            <TrendingUp size={14} className="text-muted-foreground" />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <CheckCircle2 size={14} className="text-emerald-500" />
            Low declined rate ({declinedTransactions}/{totalTransactions})
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <CheckCircle2 size={14} className="text-emerald-500" />
            Income vs expense ratio {balanceRatio.toFixed(1)}x
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <CheckCircle2 size={14} className="text-emerald-500" />
            Stable monthly activity
          </div>
        </div>
      </div>
    </div>
  );
};
