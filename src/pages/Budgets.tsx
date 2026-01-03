import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const budgets = [
  { 
    category: "Food & Dining", 
    spent: 450, 
    budget: 600, 
    percentage: 75,
    status: "healthy" 
  },
  { 
    category: "Shopping", 
    spent: 320, 
    budget: 400, 
    percentage: 80,
    status: "warning" 
  },
  { 
    category: "Transportation", 
    spent: 195, 
    budget: 200, 
    percentage: 97.5,
    status: "critical" 
  },
  { 
    category: "Entertainment", 
    spent: 120, 
    budget: 300, 
    percentage: 40,
    status: "healthy" 
  },
  { 
    category: "Health & Fitness", 
    spent: 85, 
    budget: 150, 
    percentage: 56,
    status: "healthy" 
  },
  { 
    category: "Utilities", 
    spent: 230, 
    budget: 250, 
    percentage: 92,
    status: "warning" 
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "healthy":
      return "text-success";
    case "warning":
      return "text-warning";
    case "critical":
      return "text-destructive";
    default:
      return "text-muted-foreground";
  }
};

const getProgressColor = (status: string) => {
  switch (status) {
    case "healthy":
      return "bg-success";
    case "warning":
      return "bg-warning";
    case "critical":
      return "bg-destructive";
    default:
      return "";
  }
};

export default function Budgets() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Budget Management</h1>
          <p className="text-muted-foreground mt-1">Set and track your spending limits</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Budget
        </Button>
      </div>

      <Card className="bg-warning-light border-warning">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
            <div>
              <p className="font-medium text-warning">Budget Alert</p>
              <p className="text-sm text-muted-foreground mt-1">
                You're at 97.5% of your Transportation budget. Consider reducing expenses in this category.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {budgets.map((budget) => (
          <Card key={budget.category}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{budget.category}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    ${budget.spent.toFixed(2)} of ${budget.budget.toFixed(2)}
                  </p>
                </div>
                <Badge
                  variant={budget.status === "healthy" ? "default" : "destructive"}
                  className={getStatusColor(budget.status)}
                >
                  {budget.percentage.toFixed(0)}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress 
                  value={budget.percentage} 
                  className={`h-3 ${getProgressColor(budget.status)}`}
                />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Remaining: ${(budget.budget - budget.spent).toFixed(2)}
                  </span>
                  <span className={getStatusColor(budget.status)}>
                    {budget.status === "healthy" && "On Track"}
                    {budget.status === "warning" && "Near Limit"}
                    {budget.status === "critical" && "Over Budget"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
