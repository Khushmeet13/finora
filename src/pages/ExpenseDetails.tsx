import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    ResponsiveContainer,
} from "recharts";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const categoryData = [
    { name: "Food", value: 900, color: "#FF6384" },
    { name: "Shopping", value: 700, color: "#36A2EB" },
    { name: "Transport", value: 300, color: "#FFCE56" },
    { name: "Bills", value: 1200, color: "#4BC0C0" },
];


export default function ExpenseDetails() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">

            <div className="flex items-center gap-3">
                <Link to="/">
                    <button className="p-2 rounded-lg hover:bg-muted transition">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                </Link>

                <h1 className="text-3xl font-bold">Expense Breakdown</h1>
            </div>
            <p className="text-muted-foreground -mt-3 mb-4">
                Where your money is going
            </p>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="p-5 rounded-xl bg-destructive/10 border border-destructive/30">
                    <p className="text-sm">This Month</p>
                    <p className="text-2xl font-bold text-destructive">$4,200</p>
                </div>
                <div className="p-5 rounded-xl bg-card border">
                    <p className="text-sm">Overspend Risk</p>
                    <p className="text-xl font-semibold">Medium</p>
                </div>
                <div className="p-5 rounded-xl bg-card border">
                    <p className="text-sm">Major Category</p>
                    <p className="text-xl font-semibold">Food & Dining</p>
                </div>
            </div>

            {/* Pie Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Category Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={categoryData} cx="50%" cy="50%" outerRadius={100} dataKey="value">
                                {categoryData.map((entry, i) => (
                                    <Cell key={i} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* List */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Expenses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {[
                        { name: "KFC", amount: "$32", date: "Yesterday" },
                        { name: "Uber", amount: "$12", date: "2 days ago" },
                        { name: "Zara", amount: "$80", date: "3 days ago" },
                    ].map((i) => (
                        <div key={i.name} className="flex justify-between text-sm p-2 hover:bg-muted/40 rounded-lg">
                            <span>{i.name}</span>
                            <span>{i.amount}</span>
                            <span className="text-muted-foreground">{i.date}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
