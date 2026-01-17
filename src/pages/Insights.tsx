import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Sparkles, TrendingUp, TrendingDown, AlertCircle, Lightbulb } from "lucide-react";
import { Badge } from "../components/ui/badge";

const insights = [
  {
    type: "success",
    icon: TrendingUp,
    title: "Great Savings This Month",
    description: "You've saved 15% more than your goal this month. Keep up the excellent work!",
    priority: "high",
  },
  {
    type: "warning",
    icon: AlertCircle,
    title: "Unusual Spending Detected",
    description: "Your dining expenses are 25% higher than usual. Consider home cooking to save $150/month.",
    priority: "medium",
  },
  {
    type: "info",
    icon: Lightbulb,
    title: "Subscription Optimization",
    description: "You're paying for 3 streaming services but only use 1 regularly. Potential savings: $30/month.",
    priority: "high",
  },
  {
    type: "destructive",
    icon: TrendingDown,
    title: "Budget Alert",
    description: "Transportation budget is at 97%. Consider carpooling or using public transit.",
    priority: "high",
  },
];

const monthlyTips = [
  "Set up automatic transfers to savings account on payday",
  "Review and cancel unused subscriptions",
  "Plan meals in advance to reduce food waste",
  "Use cashback credit cards for regular purchases",
  "Track impulse purchases in a separate category",
];

export default function Insights() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Insights & Tips</h1>
        <p className="text-muted-foreground mt-1">Personalized financial insights powered by AI</p>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Monthly AI Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Based on your spending patterns this month, you're on track to save <span className="font-semibold text-success">$450</span> more 
            than your goal. Your highest expense category was Food & Dining at <span className="font-semibold">$450</span>, 
            which represents a 15% increase from last month.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Key Insights</h2>
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          const variant = insight.type as "success" | "warning" | "info" | "destructive";
          
          return (
            <Card key={index} className={`border-l-4 ${
              variant === "success" ? "border-l-success" :
              variant === "warning" ? "border-l-warning" :
              variant === "destructive" ? "border-l-destructive" :
              "border-l-primary"
            }`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    variant === "success" ? "bg-success-light text-success" :
                    variant === "warning" ? "bg-warning-light text-warning" :
                    variant === "destructive" ? "bg-destructive-light text-destructive" :
                    "bg-primary/10 text-primary"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-lg">{insight.title}</h3>
                      <Badge variant={insight.priority === "high" ? "default" : "secondary"}>
                        {insight.priority === "high" ? "High Priority" : "Medium"}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mt-2">{insight.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Saving Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {monthlyTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3 text-muted-foreground">
                <span className="text-primary font-semibold mt-0.5">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
