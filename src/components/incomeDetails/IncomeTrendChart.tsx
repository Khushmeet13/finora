import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Button } from "../ui/button";
import { TrendingUp, Calendar, Info, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
    ReferenceLine,
    Brush
} from "recharts";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "../ui/dropdown-menu";

const monthlyTrend = [
    { month: "Aug 25", salary: 45000, freelance: 15000, other: 8000, total: 68000 },
    { month: "Sep 25", salary: 45000, freelance: 20000, other: 10000, total: 75000 },
    { month: "Oct 25", salary: 45000, freelance: 18000, other: 12000, total: 75000 },
    { month: "Nov 25", salary: 45000, freelance: 22000, other: 9000, total: 76000 },
    { month: "Dec 25", salary: 50000, freelance: 30000, other: 15000, total: 95000 },
    { month: "Jan 26", salary: 45000, freelance: 25000, other: 10000, total: 80000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const growth = data.total > monthlyTrend[monthlyTrend.length - 2]?.total
            ? ((data.total - monthlyTrend[monthlyTrend.length - 2].total) / monthlyTrend[monthlyTrend.length - 2].total * 100).toFixed(1)
            : null;

        const topContributor = Object.keys(data)
            .filter(k => k !== "month" && k !== "total")
            .reduce((a, b) => (data[a] > data[b] ? a : b));

        const insight = topContributor === "freelance" && growth
            ? `Freelance + Salary boosted income by ${growth}%`
            : topContributor === "salary"
                ? "Stable salary forms the core of your income"
                : "Diversified sources driving steady growth";

        return (
            <div className="bg-background/50  backdrop-blur-lg border border-white/20  shadow-[0_8px_32px_rgba(0,0,0,0.15)] rounded-xl p-4 space-y-3">
                <p className="font-semibold text-md">{label}</p>
                <div className="space-y-2">
                    <div className="flex justify-between gap-6">
                        <span className="text-muted-foreground text-sm">Salary</span>
                        <span className="font-semibold text-green-600 text-sm">₹{data.salary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between gap-6">
                        <span className="text-muted-foreground text-sm">Freelance</span>
                        <span className="font-semibold text-blue-600 text-sm">₹{data.freelance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between gap-6">
                        <span className="text-muted-foreground text-sm">Other</span>
                        <span className="font-semibold text-amber-600 text-sm">₹{data.other.toLocaleString()}</span>
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex justify-between gap-6">
                        <span className="font-medium">Total Income</span>
                        <span className="font-semibold text-lg text-primary">₹{data.total.toLocaleString()}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/10 px-3 py-1 rounded-lg">
                    <Info className="h-3 w-3 text-primary" />
                    <p className=" text-xs">{insight}</p>
                </div>
            </div>
        );
    }
    return null;
};

const IncomeTrendChart = () => {
    const [selectedRange, setSelectedRange] = useState("Last 6 Months");



    return (
        <div className="h-full">
            <Card className="h-full relative overflow-hidden shadow-md bg-card/80 backdrop-blur-md border-0">

                <CardHeader className="relative pb-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                        {/* Left Content */}
                        <CardTitle className="flex items-start gap-3 text-lg font-semibold max-w-sm">
                            <div className="p-2 rounded-lg bg-primary/5">
                                <Calendar className="h-6 w-6 text-primary" />
                            </div>

                            <div>
                                Income Trend
                                <p className="text-muted-foreground font-normal text-sm">
                                    Track how your salary, freelance, and other sources evolve over time
                                </p>
                            </div>
                        </CardTitle>

                        {/* Right Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center gap-2">
                                    {selectedRange}
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setSelectedRange("Last 3 Months")}>
                                    Last 3 Months
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => setSelectedRange("Last 6 Months")}>
                                    Last 6 Months
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => setSelectedRange("Last 1 Year")}>
                                    Last 1 Year
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </CardHeader>


                <CardContent className="relative flex-1">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={monthlyTrend} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" opacity={0.5} />

                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 12 }}
                                stroke="#888"
                            />

                            <YAxis
                                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                                tick={{ fontSize: 12 }}
                                stroke="#888"
                            />

                            {/* Average reference line */}
                            <ReferenceLine
                                y={monthlyTrend.reduce((sum, m) => sum + m.total, 0) / monthlyTrend.length}
                                stroke="#7fd3e8"
                                strokeDasharray="6 6"
                                label={{ value: "Avg", position: "insideTopRight", fill: "#7fd3e8" }}
                            />

                            {/* Lines */}
                            <Line
                                type="monotone"
                                dataKey="salary"
                                stroke="#22c55e"
                                strokeWidth={2}
                                dot={{ r: 3, fill: "#22c55e" }}
                                activeDot={{ r: 5 }}
                                name="Salary"
                            />
                            <Line
                                type="monotone"
                                dataKey="freelance"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                dot={{ r: 3, fill: "#3b82f6" }}
                                activeDot={{ r: 5 }}
                                name="Freelance"
                            />
                            <Line
                                type="monotone"
                                dataKey="other"
                                stroke="#f59e0b"
                                strokeWidth={2}
                                dot={{ r: 3, fill: "#f59e0b" }}
                                activeDot={{ r: 5 }}
                                name="Other"
                            />

                            {/* Total Income Line - Highlighted */}
                            <Line
                                type="monotone"
                                dataKey="total"
                                stroke="#0369a1" /* primary color hue */
                                strokeWidth={2}
                                dot={{ r: 4, fill: "#0369a1", strokeWidth: 1, stroke: "#fff" }}
                                activeDot={{ r: 5, strokeWidth: 1, stroke: "#fff" }}
                                name="Total Income"
                            />

                            <Tooltip content={<CustomTooltip />} />

                            <Legend
                                wrapperStyle={{ paddingTop: "20px" }}
                                iconType="circle"
                                iconSize={8}
                            />

                            {/* Brush for zoom/scroll on larger datasets */}
                            <Brush
                                dataKey="month"
                                height={20}
                                stroke="#2aa7c9"
                                fill="#e0f2fe"
                                className="rounded-brush"
                            />
                        </LineChart>
                    </ResponsiveContainer>

                    {/* Quick Summary Badges
                    <div className="flex flex-wrap gap-4 mt-6 justify-center">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10">
                            <span className="text-sm text-muted-foreground">Primary Source:</span>
                            <span className="font-bold text-green-600">Salary</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10">
                            <span className="text-sm text-muted-foreground">Fastest Growing:</span>
                            <span className="font-bold text-blue-600">Freelance</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10">
                            <span className="text-sm text-muted-foreground">Diversification:</span>
                            <span className="font-bold text-amber-600">Improving</span>
                        </div>
                    </div> */}
                </CardContent>
            </Card>
        </div>
    )
}

export default IncomeTrendChart
