import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "../components/ui/progress";

export default function BudgetDetails() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">

            <div className="flex items-center gap-3">
                <Link to="/">
                    <button className="p-2 rounded-lg hover:bg-muted transition">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                </Link>

                <h1 className="text-3xl font-bold">Budget Overview</h1>
            </div>
            <p className="text-muted-foreground -mt-3 mb-4">
                Your remaining balance & allocations.
            </p>

            {/* Big Remaining Card */}
            <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border">
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="text-4xl font-bold mt-1">$1,600</p>
                <p className="text-sm text-muted-foreground mt-2">
                    You're on track this month. Good job!
                </p>
            </div>

            {/* Category Progress */}
            <Card>
                <CardHeader>
                    <CardTitle>Category Budgets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {[
                        { name: "Food", spent: 450, total: 600 },
                        { name: "Shopping", spent: 320, total: 400 },
                        { name: "Transport", spent: 180, total: 200 },
                    ].map((c) => (
                        <div key={c.name}>
                            <div className="flex justify-between text-sm mb-1">
                                <span>{c.name}</span>
                                <span>${c.spent} / ${c.total}</span>
                            </div>
                            <Progress value={(c.spent / c.total) * 100} className="h-2" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
