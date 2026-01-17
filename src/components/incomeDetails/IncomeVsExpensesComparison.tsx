import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";

const totalIncome = 80000;
const totalExpenses = 57600;
const savings = totalIncome - totalExpenses;
const savingsRate = totalIncome > 0 ? Math.round((savings / totalIncome) * 100) : 0;
const isPositive = savings >= 0;

export default function IncomeVsExpensesComparison() {
  return (
    <Card className="h-full bg-card/80 backdrop-blur-md border-0 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-start gap-3 text-lg font-semibold max-w-sm">
          <div className="p-2 rounded-lg bg-primary/5">
            <Wallet className="h-6 w-6 text-primary" />
          </div>
          <div>
            Monthly Financial Health
            <p className="text-sm text-muted-foreground font-normal">
              Snapshot of your income, expenses & savings
            </p>
          </div>

        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-6">
        {/* Top Stats */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            label="Total Income"
            value={`₹${totalIncome.toLocaleString()}`}
            icon={<TrendingUp className="text-green-600" />}
            bg="bg-green-500/10"
          />
          <StatCard
            label="Total Expenses"
            value={`₹${totalExpenses.toLocaleString()}`}
            icon={<TrendingDown className="text-red-600" />}
            bg="bg-red-500/10"
          />
        </div>

        {/* Savings Section */}
        <div className={`p-5 rounded-xl border ${isPositive ? "border-primary/30 bg-gray-100/10" : "border-red-500/30 "}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {isPositive ? "You Saved" : "Overspent"}
              </p>
              <p className={`text-3xl font-bold mt-1 ${isPositive ? "text-primary" : "text-red-600"}`}>
                ₹{Math.abs(savings).toLocaleString()}
              </p>
            </div>

            {/* Progress Ring */}
            <div className="relative w-20 h-20">
              <svg className="w-full h-full rotate-[-90deg]">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 32}
                  strokeDashoffset={
                    2 * Math.PI * 32 -
                    (Math.min(Math.abs(savingsRate), 100) / 100) * (2 * Math.PI * 32)
                  }
                  className={isPositive ? "text-primary" : "text-red-600"}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                {Math.abs(savingsRate)}%
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            {isPositive
              ? "Great job! Your expenses are under control."
              : "Expenses exceeded income. Consider revisiting spending."}
          </p>
        </div>

        {/* Bottom Insight */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/40">
          <PiggyBank className="h-6 w-6 text-primary" />
          <p className="text-sm text-muted-foreground">
            Saving at least <span className="font-medium text-foreground">20%</span> of income is considered financially healthy.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/* Small reusable stat card */
function StatCard({ label, value, icon, bg }: any) {
  return (
    <div className={`p-4 rounded-xl ${bg} flex items-center justify-between`}>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-xl font-bold mt-1">{value}</p>
      </div>
      <div className="p-2 rounded-lg ">{icon}</div>
    </div>
  );
}
