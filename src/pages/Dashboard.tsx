import { useState } from "react";
import { StatCard } from "../components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Sparkles, PiggyBank, Plane, Car, Home, Brain, HandCoins, } from "lucide-react";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import { StatisticsChart, ExpensesPieChart } from "../components/Dashboard/StatCharts";
import CreditCard from "../components/Dashboard/CreditCard";
import SpendingOverview from "../components/Dashboard/SpendingOverview";
import { OverviewCards } from "../components/Dashboard/OverviewCards";
import TransactionHistory from "../components/Dashboard/TransactionHistory";
import { UpcomingTransactions } from "../components/Dashboard/UpcomingTransactions";
import { TransactionHealthMeter } from "../components/Dashboard/TransactionHealthMeter";


const categoryData = [
  { name: "Food & Groceries", value: 1850, color: "#60A5FA" },    // Light blue
  { name: "Housing", value: 1400, color: "#93BBFC" },           // Lighter
  { name: "Utilities", value: 950, color: "#2563EB" },          // Dark blue
  { name: "Transportation", value: 650, color: "#A5CEFF" },     // Very light
  { name: "Healthcare", value: 451, color: "#3B82F6" },         // Medium blue
];

const totalAmount = categoryData.reduce((sum, item) => sum + item.value, 0);

const monthlyData = [
  { month: "Jan", income: 18000, expenses: 14000 },
  { month: "Feb", income: 28000, expenses: 22000 },
  { month: "Mar", income: 35000, expenses: 28000 },
  { month: "Apr", income: 38000, expenses: 30000 },
  { month: "May", income: 39000, expenses: 28000 },
  { month: "Jun", income: 36000, expenses: 25000 },
  { month: "Jul", income: 38000, expenses: 29000 },
  { month: "Aug", income: 41000, expenses: 27000 },
  { month: "Sep", income: 35000, expenses: 24000 },
  { month: "Oct", income: 22000, expenses: 19000 },
  { month: "Nov", income: 18000, expenses: 16000 },
  { month: "Dec", income: 36000, expenses: 26000 },
];

const pieData = [
  { name: "Housing", value: 18, color: "#155E75" },        // darkest blue
  { name: "Debt payments", value: 7, color: "#1B728E" },
  { name: "Food", value: 6, color: "#2196B5" },            // primary blue
  { name: "Transportation", value: 9, color: "#4FB3CE" },
  { name: "Healthcare", value: 10, color: "#7CCCE0" },
  { name: "Investments", value: 17, color: "#A6DDEA" },   // emerald
  { name: "Other", value: 33, color: "#f3f4f6" },          // light green
];

const goalData = [
  { name: "Reserve", target: 10000, current: 7000, icon: PiggyBank, months: "4 months" },
  { name: "Travel", target: 4000, current: 2500, icon: Plane, months: "12 months" },
  { name: "Car", target: 20000, current: 14600, icon: Car, months: "2 years 6 months" },
  { name: "Real estate", target: 50000, current: 8300, icon: Home, months: "8 months" },
];

export default function Dashboard() {
  const [period, setPeriod] = useState("This Year");
  const [selectedMonth] = useState("January");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm">Welcome back! Here's your financial overview</p>
      </div>

      <div className="grid gap-6 grid-cols-4">
        <div className="col-span-2 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <StatCard
            title="Total Income"
            value="$5,800"
            trend={{ value: "12% from last month", isPositive: true }}
            variant="success"
            chartType="area"
            chartData={[
              { value: 38000 },
              { value: 52000 },
              { value: 29000 },
              { value: 55000 },
              { value: 41000 },
              { value: 54130 },
              { value: 52000 },
              { value: 29000 },
              { value: 55000 },

            ]}
          />
          <StatCard
            title="Remaining Budget"
            value="$1,600"
            trend={{ value: "10% from last month", isPositive: true }}
            variant="default"
            chartType="bar"
            chartData={[
              { value: 1800, fill: "#e0e7ff" },
              { value: 1500, fill: "#e0e7ff" },
              { value: 2333, fill: "hsl(197 71% 45%)" },  // highlighted bar
              { value: 1900, fill: "#e0e7ff" },
              { value: 1200, fill: "#e0e7ff" },
            ]}


          />
          <StatCard
            title="Total Spent"
            value="$4,200"
            trend={{ value: "8% from last month", isPositive: false }}
            variant="destructive"

            chartType="area"
            chartData={[
              { value: 90000 },
              { value: 88000 },
              { value: 92000 },
              { value: 60100 },
              { value: 99000 },
              { value: 50150 },
              { value: 81000 },
              { value: 74130 },
              { value: 52000 },
              { value: 69000 },
              { value: 55000 },
            ]}
          />

          <StatCard
            title="Transactions"
            value="127"
            trend={{ value: "5 today", isPositive: true }}
            variant="warning"
            chartType="ring"
            ringValue={77}
          />
        </div>

        <div className="col-span-2 h-full flex">
          <CreditCard />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-12">
        {/* Statistics Card ko replace karo isse */}

        <StatisticsChart
          period={period}
          setPeriod={setPeriod}
          monthlyData={monthlyData}
        />

        <ExpensesPieChart
          categoryData={categoryData}
          totalAmount={totalAmount}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3 xl:grid-cols-2">
        {/* LEFT COLUMN */}
        <div className="xl:col-span-1 flex flex-col gap-6">
          <TransactionHealthMeter
            totalTransactions={127}
            declinedTransactions={8}
            income={5800}
            expenses={4200}
          />

          <UpcomingTransactions />
        </div>


        {/* RIGHT COLUMN */}
        <div className="xl=col-span-2">
          <TransactionHistory />
        </div>
      </div>


      <div className=" grid gap-6 lg:grid-cols-1">
        <SpendingOverview />

        {/* Main Grid */}
        <OverviewCards
          selectedMonth={selectedMonth}
          pieData={pieData}
          goalData={goalData}
        />

      </div>



      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Budget Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { category: "Food & Dining", spent: 450, budget: 600, color: "primary" },
              { category: "Shopping", spent: 320, budget: 400, color: "success" },
              { category: "Transportation", spent: 180, budget: 200, color: "warning" },
            ].map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.category}</span>
                  <span className="text-muted-foreground">
                    ${item.spent} / ${item.budget}
                  </span>
                </div>
                <Progress value={(item.spent / item.budget) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium flex items-center gap-1"><Brain size={16} /> Top Insight</p>
              <p className="text-sm text-muted-foreground">
                Your dining expenses are 15% higher than last month. Consider meal planning to save $120.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium flex items-center gap-1"><HandCoins size={16} /> Savings Opportunity</p>
              <p className="text-sm text-muted-foreground">
                You have $1,600 remaining this month. Based on your interests, we found 5 great deals.
              </p>
            </div>
            <Button className="w-full" variant="default">
              <Sparkles className="h-4 w-4 mr-2" />
              View AI Recommendations
            </Button>
          </CardContent>
        </Card>
      </div>


    </div>
  );
}
