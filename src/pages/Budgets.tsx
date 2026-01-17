import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Plus, AlertTriangle } from "lucide-react";
import { Badge } from "../components/ui/badge";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const budgets = [
  { category: "Food & Dining", spent: 450, budget: 600, status: "healthy" },
  { category: "Shopping", spent: 320, budget: 400, status: "warning" },
  { category: "Transportation", spent: 195, budget: 200, status: "critical" },
  { category: "Entertainment", spent: 120, budget: 300, status: "healthy" },
  { category: "Health & Fitness", spent: 85, budget: 150, status: "healthy" },
  { category: "Utilities", spent: 230, budget: 250, status: "warning" },
];

const totalBudget = budgets.reduce((a, b) => a + b.budget, 0);
const totalSpent = budgets.reduce((a, b) => a + b.spent, 0);
const remaining = totalBudget - totalSpent;

const pieData = [
  { name: "Spent", value: totalSpent },
  { name: "Remaining", value: remaining },
];

const COLORS = ["#22A2C9", "#E5E7EB"];

const getStatusStyles = (status: string) => {
  switch (status) {
    case "healthy":
      return "text-green-600 bg-green-50 border-green-200";
    case "warning":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "critical":
      return "text-red-600 bg-red-50 border-red-200";
  }
};

export default function BudgetPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Budget</h1>
          <p className="text-muted-foreground">
            Plan and control your monthly spending
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Budget
        </Button>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Budget</p>
            <h2 className="text-2xl font-bold">${totalBudget}</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Spent</p>
            <h2 className="text-2xl font-bold text-primary">${totalSpent}</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Remaining</p>
            <h2 className="text-2xl font-bold text-green-600">${remaining}</h2>
          </CardContent>
        </Card>
      </div>

      {/* Chart + Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Donut Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Budget Utilization</CardTitle>
          </CardHeader>
          <CardContent className="h-[260px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  cornerRadius={10}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-xl font-semibold">
                {Math.round((totalSpent / totalBudget) * 100)}%
              </p>
              <p className="text-xs text-muted-foreground">Used</p>
            </div>
          </CardContent>
        </Card>

        {/* Alert */}
        <Card className="lg:col-span-2 border-red-200 bg-red-50">
          <CardContent className="p-4 flex gap-3">
            <AlertTriangle className="text-red-500 mt-1" />
            <div>
              <p className="font-medium text-red-600">Budget Alert</p>
              <p className="text-sm text-muted-foreground">
                Transportation budget is almost exhausted. Consider limiting expenses.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Budgets */}
      <div className="grid gap-4">
        {budgets.map((b) => {
          const percent = (b.spent / b.budget) * 100;

          return (
            <Card key={b.category}>
              <CardContent className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{b.category}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${b.spent} of ${b.budget}
                    </p>
                  </div>

                  <Badge className={`border ${getStatusStyles(b.status)}`}>
                    {percent.toFixed(0)}%
                  </Badge>
                </div>

                <Progress value={percent} className="h-2" />

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Remaining: ${b.budget - b.spent}
                  </span>
                  <span className={getStatusStyles(b.status)}>
                    {b.status === "healthy" && "On Track"}
                    {b.status === "warning" && "Near Limit"}
                    {b.status === "critical" && "Over Budget"}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
