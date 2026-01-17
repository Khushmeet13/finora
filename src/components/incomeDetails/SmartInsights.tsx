import {
    PieChart,
} from "recharts";
import { Card, CardContent } from "../../components/ui/card"
import {
    TrendingUp,
    Info,
    ShieldCheck,
} from "lucide-react";;

const SmartInsights = () => {
    const growthRate = "+12.6%";
    return (
        <div>
            <Card className="relative overflow-hidden backdrop-blur-md border-0 shadow-md transition-all duration-500">
                <CardContent className="relative p-8">
                    <div className="flex items-start gap-5">
                        {/* Icon with glow effect */}
                        <div className="relative p-2 rounded-lg bg-primary/5">
                            <div className="absolute inset-0 rounded-lg bg-primary/5 blur-xl" />
                            <Info className="relative h-5 w-5 text-primary" />
                        </div>

                        <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-4">
                                Smart Insights
                            </h3>

                            <div className="space-y-4">
                                {/* Insight 1 */}
                                <div className="flex items-center gap-4 p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors duration-300">
                                    <TrendingUp className="h-5 w-5 text-primary flex-shrink-0" />
                                    <p className="text-foreground">
                                        Your income grew by{" "}
                                        <span className="text-xl font-medium text-primary">{growthRate}</span>{" "}
                                        this month — keep it up!
                                    </p>
                                </div>

                                {/* Insight 2 */}
                                <div className="flex items-center gap-4 p-2 rounded-lg bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors duration-300">
                                    <PieChart className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                                    <p className="text-foreground">
                                        Freelance now contributes{" "}
                                        <span className="text-xl font-medium text-emerald-600">24.5%</span> of
                                        your total income — diversifying nicely!
                                    </p>
                                </div>

                                {/* Insight 3 */}
                                <div className="flex items-center gap-4 p-2 rounded-lg bg-blue-500/5 hover:bg-blue-500/10 transition-colors duration-300">
                                    <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                    <p className="text-foreground">
                                        Only <span className="text-lg font-medium text-blue-600">18%</span> of
                                        gross salary goes to deductions —{" "}
                                        <span className="font-medium text-primary">better than average!</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default SmartInsights
