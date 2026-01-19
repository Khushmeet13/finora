import BudgetActionsFAB from "../components/budget/BudgetActionsFAB";
import BudgetAlerts from "../components/budget/BudgetAlerts";
import BudgetCards from "../components/budget/BudgetCards";
import BudgetFilters from "../components/budget/BudgetFilters";
import BudgetHealthScore from "../components/budget/BudgetHealthScore";
import BudgetSuggestions from "../components/budget/BudgetSuggestions";
import BudgetVsSpentChart from "../components/budget/BudgetVsSpentChart";
import CategoryBudget from "../components/budget/CategoryBudget";
import CategoryDonutChart from "../components/budget/CategoryDonutChart";
import DaysLeftIndicator from "../components/budget/DaysLeftIndicator";
import GreenBudgetBadge from "../components/budget/GreenBudgetBadge";
import MonthlyTrendChart from "../components/budget/MonthlyTrendChart";
import PredictiveBudget from "../components/budget/PredictiveBudget";
import SavingsGoal from "../components/budget/SavingsGoal";
import SpendingPersonality from "../components/budget/SpendingPersonality";

const categoryData = [
  { name: "Food & Dining", value: 4200 },
  { name: "Rent & Bills", value: 8000 },
  { name: "Shopping", value: 2850 },
  { name: "Transport", value: 1450 },
  { name: "Entertainment", value: 1680 },
  { name: "Others", value: 1320 }
];

const categoryBudgetData = [
  {
    name: "Food & Dining",
    allocated: 6000,
    spent: 4200
  },
  {
    name: "Rent & Bills",
    allocated: 8000,
    spent: 8000
  },
  {
    name: "Shopping",
    allocated: 3000,
    spent: 2850
  },
  {
    name: "Transport",
    allocated: 2000,
    spent: 1450
  },
  {
    name: "Entertainment",
    allocated: 1500,
    spent: 1680
  }
];

const last6MonthsSpending = [
  18500,    // July
  17200,    // August
  19800,    // September
  13400,    // October
  15600,    // November
  13500     // December
];

export default function BudgetOverview() {


  return (
    <div className="space-y-5">
      <BudgetFilters />
      <BudgetCards />
      <CategoryBudget />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Left bigger chart */}
        <div className="lg:col-span-1">
          <CategoryDonutChart data={categoryData} />
        </div>

        {/* Right side - two smaller charts stacked */}
        <div className="space-y-6">
          <BudgetVsSpentChart categories={categoryBudgetData} />
         
        </div>
      </div>
       <MonthlyTrendChart monthlyData={[18500, 17200, 19800, 13400, 15600, 13500]} />
       <BudgetAlerts />
       <BudgetSuggestions />
       <DaysLeftIndicator />
       <SavingsGoal />
       <PredictiveBudget />
       <BudgetHealthScore />
       <SpendingPersonality />
       <GreenBudgetBadge />
       <BudgetActionsFAB />
    </div>
  );
}