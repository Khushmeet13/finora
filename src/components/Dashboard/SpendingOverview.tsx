import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Card, CardContent } from "../ui/card";

export default function SpendingOverview() {
    return (
        <div className=" grid gap-6 lg:grid-cols-2">

            {/* 1️⃣ Monthly Spending Limit */}
            <div className="shadow rounded-xl border p-5">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-lg font-medium text-gray-900">
                            Monthly spending limit
                        </h1>
                        <p className="text-xs text-gray-500 mt-1">
                            Receipts & statements
                        </p>
                    </div>

                    <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                    </Button>
                </div>

                <Progress value={86} className="h-2 bg-gray-100 mt-8">
                    <div
                        className="h-full bg-white rounded-full"
                        style={{ width: "86%" }}
                    />
                </Progress>

                <div className="flex justify-between items-center">
                    <div className="text-base">$8,600</div>
                    <div className="text-base opacity-90">$10,000</div>
                </div>
            </div>

            {/* 2️⃣ Tips Card */}
            <Card className=" shadow">
                <CardContent className="p-5 flex items-center justify-between h-full">
                    <div>
                        <h3 className="font-semibold text-lg">
                            Optimize your budget with these quick tips
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Start preparing for the 2025 tax season by saving 10–15% for deductions.
                        </p>

                        <Button
                            variant="link"
                            className="p-0 h-auto mt-3 text-primary"
                        >
                            Read more →
                        </Button>
                    </div>

                    <div className="flex gap-1 items-end">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="w-8 bg-gradient-to-t from-white to-primary rounded-t-lg opacity-80"
                                style={{ height: `${40 + i * 20}px` }}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* 3️⃣ Transaction History
            <div>
                {/* <TransactionHistory />
            </div> */}

        </div>
    );
}
