import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import {
  ChevronDown,
  MoveUpRight,
  Plus,
} from "lucide-react";

interface Props {
  selectedMonth: string;
  pieData: any[];
  goalData: any[];
}

export const OverviewCards = ({
  selectedMonth,
  pieData,
  goalData,
}: Props) => {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Cost Analysis */}
      <Card>
        <CardHeader className="pb-2 pt-4 px-5">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-semibold">
                Cost analysis
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Spending overview
              </p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {selectedMonth}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>January</DropdownMenuItem>
                <DropdownMenuItem>February</DropdownMenuItem>
                <DropdownMenuItem>March</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-3xl font-medium mt-5">$8,450</div>

          {/* Bar */}
          <div className="flex gap-1 h-8">
            {pieData.map((item, i) => (
              <div
                key={i}
                className="rounded-sm"
                style={{
                  backgroundColor: item.color,
                  width: `${item.value * 2.8}%`,
                }}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="grid gap-2 text-sm">
            {pieData.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-2"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-600">{item.name}</span>
                <span className="ml-auto font-medium">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Health */}
      <Card>
        <CardHeader className="pb-2 pt-4 px-5">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-semibold">
                Financial health
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Current Status
              </p>
            </div>

            <Button variant="outline" size="sm">
              30d <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-medium mt-5">$15,780</div>

          <p className="text-sm mt-2 flex items-center gap-1 text-muted-foreground">
            <span className="text-green-600 flex items-center gap-1">
              <MoveUpRight size={14} /> 7.5%
            </span>
            from last month
          </p>

          {/* Gauge */}
          <div className="relative w-64 h-40 mx-auto mt-5">
            <svg viewBox="0 0 200 100" className="w-full h-full">
              <path
                d="M 10 90 A 80 80 0 0 1 190 90"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth={12}
              />
              <path
                d="M 10 90 A 80 80 0 0 1 190 90"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth={12}
                pathLength={100}
                strokeDasharray="75 25"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-end pb-6">
              <div className="text-3xl font-medium">75%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Of monthly income saved
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Based on aggregated transaction metrics over the past 30 days
          </p>
        </CardContent>
      </Card>

      {/* Goal Tracker */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Goal tracker</CardTitle>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" /> Add goals
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-gray-600 mb-2">This year</p>

          <div className="space-y-6">
            {goalData.map((goal) => {
              const Icon = goal.icon;
              const percentage =
                (goal.current / goal.target) * 100;

              return (
                <div key={goal.name} className="space-y-3">
                  <div className="flex gap-4">
                    <div className="p-3 bg-cyan-100/25 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">
                          {goal.name}
                        </span>
                        <span className="text-gray-600">
                          ${goal.current.toLocaleString()} / $
                          {goal.target.toLocaleString()}
                        </span>
                      </div>

                      <Progress
                        value={percentage}
                        className="h-2 mt-2"
                      />

                      <p className="text-xs text-gray-500 mt-1">
                        Left to save: {goal.months}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
