import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { TrendingUp, IndianRupee, ArrowDown, ShieldAlert, } from "lucide-react";

const salaryBreakdown = [
  { label: "Basic Pay", amount: 35000, percentage: 50 },
  { label: "HRA", amount: 14000, percentage: 20 },
  { label: "Special Allowance", amount: 14000, percentage: 20 },
  { label: "Performance Bonus", amount: 7000, percentage: 10 },
];

const deductions = [
  { label: "Income Tax (TDS)", amount: 8000, percentage: 11.4 },
  { label: "EPF (Employee)", amount: 4200, percentage: 6 },
  { label: "Professional Tax", amount: 200, percentage: 0.3 },
  { label: "Insurance", amount: 1600, percentage: 2.3 },
];

const SalaryStructureAndDeductions = () => {
    const grossSalary = salaryBreakdown.reduce((sum, item) => sum + item.amount, 0);
const totalDeductions = deductions.reduce((sum, item) => sum + item.amount, 0);
const netSalary = grossSalary - totalDeductions;
    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <Card className="relative overflow-hidden shadow-md backdrop-blur-md border-0">

                <CardHeader className="relative pb-8">
                    <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                        <div className="p-2 rounded-lg bg-primary/5">
                            <IndianRupee className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            Salary Structure
                            <p className="text-muted-foreground font-normal text-sm">Understand how your monthly pay is calculated</p>
                        </div>

                    </CardTitle>

                </CardHeader>

                <CardContent className="relative space-y-4">
                    {/* Gross Salary Highlight */}
                    <div className="p-4 rounded-lg border ">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Gross Monthly Salary</p>
                                <p className="text-2xl font-semibold text-black mt-1">
                                    ₹{grossSalary.toLocaleString()}
                                </p>
                            </div>
                            <TrendingUp className="h-10 w-10 text-primary" />
                        </div>
                    </div>

                    {/* Earnings Breakdown */}
                    <div className="space-y-5">

                        {salaryBreakdown.map((item, idx) => (
                            <div key={item.label} className="group">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium">{item.label}</span>
                                    <div className="text-right">
                                        <span className="font-medium text-lg">₹{item.amount.toLocaleString()}</span>
                                        <span className="text-sm text-muted-foreground ml-2">({item.percentage}%)</span>
                                    </div>
                                </div>
                                <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                                    <div
                                        className="h-2 rounded-full bg-gradient-to-r from-primary to-primary/70
                       transition-all duration-1000 ease-out group-hover:scale-x-105"
                                        style={{
                                            width: `${item.percentage}%`,
                                            transformOrigin: "left",
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Flow to Net Salary */}
                    <div className="relative">
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500/50 to-red-500/50 -translate-x-1/2" />

                        <div className="flex items-center justify-center my-4">
                            <ArrowDown className="h-6 w-6 text-primary animate-bounce" />
                        </div>
                    </div>

                    {/* Net Salary Highlight */}
                    <div className="p-4 rounded-xl border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground uppercase tracking-wider">Take-Home Pay</p>
                                <p className="text-3xl font-semibold text-black mt-2">
                                    ₹{netSalary.toLocaleString()}
                                </p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    After all statutory & voluntary deductions
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200/20">
                                    <span className="text-xl font-bold text-black">
                                        {((netSalary / grossSalary) * 100).toFixed(1)}%
                                    </span>
                                    <span className="text-sm text-muted-foreground">of Gross</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Insight */}
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <span>Earnings</span>
                        </div>
                        <span>•</span>
                        <span>
                            Net = Gross − Deductions ({((totalDeductions / grossSalary) * 100).toFixed(1)}% withheld)
                        </span>
                    </div>
                </CardContent>
            </Card>

            {/* Deductions */}
          <Card className="relative overflow-hidden shadow-md backdrop-blur-md border-0">

            <CardHeader className="relative pb-8">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                <div className="p-2 rounded-lg bg-primary/5">
                  <ShieldAlert className="h-5 w-5 text-primary" />
                </div>
                <div>
                  Deductions & Withholdings
                  <p className="text-muted-foreground text-sm font-normal">
                    Statutory and voluntary deductions from your gross salary
                  </p>
                </div>

              </CardTitle>

            </CardHeader>

            <CardContent className="relative space-y-4">
              {/* Total Deductions Highlight */}
              <div className="p-4 rounded-lg border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Deductions</p>
                    <p className="text-2xl font-semibold text-black mt-1">
                      -₹{totalDeductions.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200/20">
                      <span className="text-xl font-bold text-black">
                        {((totalDeductions / grossSalary) * 100).toFixed(1)}%
                      </span>
                      <span className="text-sm text-muted-foreground">of Gross</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deductions Breakdown */}
              <div className="space-y-4">

                {deductions.map((item, idx) => (
                  <div key={item.label} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{item.label}</span>
                      <div className="text-right">
                        <span className="font-medium text-lg text-black">
                          -₹{item.amount.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground ml-2">
                          ({item.percentage}%)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-primary to-primary/70 
                       transition-all duration-1000 ease-out group-hover:scale-x-105"
                        style={{
                          width: `${item.percentage}%`,
                          transformOrigin: "left",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Flow Indicator */}
              <div className="flex items-center justify-center">
                <ArrowDown className="h-6 w-6 text-red-500/60 animate-bounce" />
              </div>

              {/* Impact on Take-Home */}
              <div className="p-4 rounded-lg border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">
                      Impact on Your Pay
                    </p>
                    <p className="text-xl font-medium mt-2">
                      These deductions reduce your in-hand salary by{" "}
                      <span className="text-red-600">
                        ₹{totalDeductions.toLocaleString()}
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Some are mandatory (tax, PF), others optional (insurance)
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Legend */}
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>Deductions</span>
                </div>
                <span>•</span>
                <span>
                  Net Salary = Gross − Total Deductions
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
    )
}

export default SalaryStructureAndDeductions
