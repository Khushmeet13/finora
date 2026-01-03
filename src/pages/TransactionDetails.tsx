import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function TransactionsDetails() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">

            <div className="flex items-center gap-3">
                <Link to="/">
                    <button className="p-2 rounded-lg hover:bg-muted transition">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                </Link>

                <h1 className="text-3xl font-bold">All Transactions</h1>
            </div>
            <p className="text-muted-foreground -mt-3 mb-4">
                A complete list of your activity.
            </p>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[
                        { name: "Starbucks", amount: "-$6", type: "expense" },
                        { name: "Salary Credit", amount: "+$4500", type: "income" },
                        { name: "Amazon", amount: "-$52", type: "expense" },
                    ].map((t) => (
                        <div key={t.name} className="flex justify-between items-center p-3 rounded-xl hover:bg-muted/40 transition">
                            <span className="font-medium">{t.name}</span>
                            <span className={t.type === "income" ? "text-success" : "text-destructive"}>
                                {t.amount}
                            </span>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
