import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell,
} from "recharts";

// ---------------------------------------------------------
// 📌 Types
// ---------------------------------------------------------

export interface MonthlyDataItem {
    month: string;
    income: number;
    expenses: number;
}

interface StatisticsChartProps {
    period: string;
    setPeriod: (value: string) => void;
    monthlyData: MonthlyDataItem[];
}

export interface CategoryDataItem {
    name: string;
    value: number;
    color: string;
}

interface ExpensesPieChartProps {
    categoryData: CategoryDataItem[];
    totalAmount: number;
}

// ---------------------------------------------------------
// 📌 1) Statistics Chart Component (Bar Chart)
// ---------------------------------------------------------

export function StatisticsChart({
    period,
    setPeriod,
    monthlyData,
}: StatisticsChartProps) {
    return (
        <Card className="lg:col-span-8 xl:col-span-8 pb-0">
            <CardHeader className="pb-2 pt-4 px-5">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Statistics</CardTitle>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary" />
                            <span className="text-sm text-muted-foreground font-medium">
                                Income
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gray-400" />
                            <span className="text-sm text-muted-foreground font-medium">
                                Expense
                            </span>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 gap-0.5 text-sm font-medium border-0 shadow-none"
                                >
                                    <span className="text-muted-foreground">{period}</span>
                                    <ChevronDown className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>Time Period</DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                {[
                                    "This Week",
                                    "This Month",
                                    "Last 6 Months",
                                    "This Year",
                                    "All Time",
                                ].map((option) => (
                                    <DropdownMenuItem
                                        key={option}
                                        onClick={() => setPeriod(option)}
                                        className={
                                            period === option ? "bg-accent text-primary font-medium" : ""
                                        }
                                    >
                                        {option}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pl-0 -m-px">
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                        data={monthlyData}
                        margin={{ top: 20, right: 0, left: 0, bottom: -10 }}
                    >
                        <CartesianGrid
                            strokeWidth={1}
                            stroke="hsl(var(--border))"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="month"
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickFormatter={(value: number) => `${value / 1000}k`}
                        />

                        <Tooltip
                            cursor={{ fill: "rgba(255, 255, 255, 0.08)", radius: 8 }}
                            contentStyle={{
                                backgroundColor: "rgba(255, 255, 255, 0.12)",
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                borderRadius: "14px",
                                padding: "12px 16px",
                                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
                                color: "hsl(var(--foreground))",
                                fontSize: "14px",
                                fontWeight: "500",
                            }}
                            labelStyle={{
                                color: "hsl(var(--foreground))",
                                fontWeight: "600",
                                marginBottom: "4px",
                                fontSize: "13px",
                            }}
                            itemStyle={{
                                color: "hsl(var(--foreground))",
                                fontWeight: "500",
                            }}
                            formatter={(value: number) => `$${value.toLocaleString()}`}
                        />

                        <Bar
                            dataKey="income"
                            name="Income"
                            fill="hsl(var(--primary))"
                            radius={[8, 8, 0, 0]}
                            barSize={10}
                        />

                        <Bar
                            dataKey="expenses"
                            name="Expense"
                            fill="#94a3b8"
                            radius={[8, 8, 0, 0]}
                            barSize={10}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

// ---------------------------------------------------------
// Expenses Pie Chart Component
// ---------------------------------------------------------

export function ExpensesPieChart({
    categoryData,
    totalAmount,
}: ExpensesPieChartProps) {
    return (
        <Card className="lg:col-span-4 xl:col-span-4">
            <CardHeader className="flex flex-row items-center justify-between pb-0 pt-4 px-5">
                <CardTitle className="text-lg font-medium">Expenses</CardTitle>

                <div className="text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-md border">
                    Last 6 months ⌄
                </div>
            </CardHeader>

            <CardContent className="pb-6">
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={2}
                            dataKey="value"
                            cornerRadius={8}
                        >
                            {categoryData.map((entry, i) => (
                                <Cell key={i} fill={entry.color} strokeWidth={3} stroke="#fff" />
                            ))}
                        </Pie>

                        <text
                            x="50%"
                            y="45%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-sm fill-muted-foreground font-medium"
                        >
                            Total
                        </text>

                        <text
                            x="50%"
                            y="55%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-2xl font-bold fill-foreground"
                        >
                            ${totalAmount.toLocaleString()}
                        </text>

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "var(--radius)",
                                fontSize: "12px",
                            }}
                            formatter={(value: number) => `$${value.toLocaleString()}`}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Legend */}
                {/* Legend Top Row → First 3 items */}
                <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto mb-3">
                    {categoryData.slice(0, 3).map((item) => (
                        <div key={item.name} className="flex items-center gap-2 border p-1 rounded-md">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-xs text-muted-foreground">{item.name}</span>
                        </div>
                    ))}
                </div>

                {/* Legend Bottom Row → Last 2 items */}
                <div className="grid grid-cols-2 gap-3 max-w-sm mx-12">
                    {categoryData.slice(3).map((item) => (
                        <div key={item.name} className="flex items-center gap-2 border p-1 rounded-md">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-xs text-muted-foreground">{item.name}</span>
                        </div>
                    ))}
                </div>

            </CardContent>
        </Card>
    );
}
