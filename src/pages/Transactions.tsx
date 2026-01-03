import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, TrendingUp, TrendingDown, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const transactions = [
  { id: 1, name: "Grocery Shopping", amount: -85.50, category: "Food", date: "2025-01-28", type: "expense" },
  { id: 2, name: "Salary", amount: 5800, category: "Income", date: "2025-01-25", type: "income" },
  { id: 3, name: "Netflix Subscription", amount: -15.99, category: "Entertainment", date: "2025-01-24", type: "expense" },
  { id: 4, name: "Uber Ride", amount: -22.50, category: "Transportation", date: "2025-01-23", type: "expense" },
  { id: 5, name: "Freelance Project", amount: 450, category: "Income", date: "2025-01-22", type: "income" },
  { id: 6, name: "Restaurant", amount: -67.30, category: "Food", date: "2025-01-21", type: "expense" },
  { id: 7, name: "Online Shopping", amount: -129.99, category: "Shopping", date: "2025-01-20", type: "expense" },
  { id: 8, name: "Gym Membership", amount: -45, category: "Health", date: "2025-01-18", type: "expense" },
];

export default function Transactions() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground mt-1">Track and manage all your transactions</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search transactions..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    transaction.type === "income" ? "bg-success-light text-success" : "bg-destructive-light text-destructive"
                  }`}>
                    {transaction.type === "income" ? (
                      <TrendingUp className="h-5 w-5" />
                    ) : (
                      <TrendingDown className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{transaction.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {transaction.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{transaction.date}</span>
                    </div>
                  </div>
                </div>
                <p className={`text-lg font-semibold ${
                  transaction.type === "income" ? "text-success" : "text-destructive"
                }`}>
                  {transaction.type === "income" ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
