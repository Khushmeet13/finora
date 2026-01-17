import { useState } from "react";
import {
  Wallet,
  Briefcase,
  PiggyBank,
  TrendingUp,
  CreditCard,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";

/* ---------- DATA ---------- */

const statsData = [
  {
    label: "Total Monthly Income",
    value: "₹95,000",
    icon: Wallet,
    details: [
      { name: "Salary", amount: "₹45,000" },
      { name: "Freelance", amount: "₹25,000" },
      { name: "Investments", amount: "₹25,000" },
    ],
  },
  {
    label: "Primary Salary (Net)",
    value: "₹70,000",
    icon: Briefcase,
    details: [
      { name: "Gross Salary", amount: "₹85,000" },
      { name: "Tax", amount: "-₹12,000" },
      { name: "PF", amount: "-₹3,000" },
    ],
  },
  {
    label: "Other Income",
    value: "₹30,000",
    icon: PiggyBank,
    details: [
      { name: "Freelance", amount: "₹15,000" },
      { name: "Rental", amount: "₹5,000" },
      { name: "Crypto", amount: "₹10,000" },
    ],
  },
  {
    label: "Growth vs Last Month",
    value: "+12.6%",
    icon: TrendingUp,
    isGrowth: true,
    details: [
      { name: "Last Month", amount: "₹72,000" },
      { name: "This Month", amount: "₹95,000" },
      { name: "Net Growth", amount: "+₹23,000" },
    ],
  },
  {
    label: "Deductions",
    value: "₹18,200",
    icon: CreditCard,
    details: [
      { name: "Income Tax", amount: "-₹12,000" },
      { name: "PF", amount: "-₹4,200" },
      { name: "Insurance", amount: "-₹2,000" },
    ],
  },
];

/* ---------- COMPONENT ---------- */

export default function IncomeSummaryCards() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  const handleClick = (label: string) => {
    if (!isMobile) return;
    setExpandedCard(expandedCard === label ? null : label);
  };

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {/* <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: "Total Monthly Income", value: `₹${totalMonthlyIncome.toLocaleString()}`, icon: Wallet },
            { label: "Primary Salary (Net)", value: `₹${netSalary.toLocaleString()}`, icon: Briefcase },
            { label: "Other Income", value: `₹${totalOtherIncome.toLocaleString()}`, icon: PiggyBank },
            { label: "Growth vs Last Month", value: growthRate, icon: TrendingUp, isGrowth: true },
            { label: "Deductions", value: `₹${totalDeductions.toLocaleString()}`, icon: CreditCard },
          ].map((stat) => (
            <Card
              key={stat.label}
              className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/30 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p
                      className={`text-2xl font-semibold mt-2 ${stat.isGrowth
                        ? parseFloat(growthRate.replace("%", "")) >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                        : "text-foreground"
                        }`}
                    >
                      {stat.value}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                {/* Optional subtle gradient overlay 
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
              </CardContent>
            </Card>
          ))}
        </div> */}
        
      {statsData.map((stat) => {
        const Icon = stat.icon;
        const isExpanded = expandedCard === stat.label;

        return (
          <Card
            key={stat.label}
            onClick={() => handleClick(stat.label)}
            className="
              group relative overflow-hidden cursor-pointer lg:cursor-default
              border border-transparent hover:border-primary/30
              shadow-md hover:shadow-xl transition-all duration-500
              bg-card/95 backdrop-blur lg:hover:overflow-visible
            "
          >
            <CardContent className="p-6 min-h-[140px] flex flex-col justify-between">
              {/* -------- MAIN CONTENT -------- */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                  <p
                    className={`text-2xl font-semibold mt-2 ${
                      stat.isGrowth ? "text-green-600" : "text-foreground"
                    }`}
                  >
                    {stat.value}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-primary/5">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>

              {/* -------- DESKTOP HOVER (ABSOLUTE) -------- */}
              <div
                className="
                  absolute inset-x-0 bottom-0
                  bg-card border-t border-primary/20
                  px-6 py-5
                  opacity-0 invisible translate-y-4
                  transition-all duration-500
                  pointer-events-none
                  lg:group-hover:opacity-100
                  lg:group-hover:visible
                  lg:group-hover:translate-y-0
                  lg:group-hover:pointer-events-auto
                "
              >
                <Breakdown stat={stat} />
              </div>

              {/* -------- MOBILE EXPAND (INLINE) -------- */}
              <div
                className={`
                  lg:hidden overflow-hidden transition-all duration-500
                  ${isExpanded ? "max-h-60 mt-4 opacity-100" : "max-h-0 opacity-0"}
                `}
              >
                <div className="h-px bg-primary/20 my-4" />
                <Breakdown stat={stat} />
              </div>

              {/* -------- MOBILE CHEVRON -------- */}
              <div className="absolute top-4 right-4 lg:hidden">
                <ChevronDown
                  className={`h-5 w-5 text-primary transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-30 pointer-events-none" />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

/* ---------- BREAKDOWN SUB COMPONENT ---------- */

function Breakdown({ stat }: any) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
        Breakdown
      </p>

      {stat.details.map((item: any, idx: number) => (
        <div
          key={idx}
          className="flex justify-between items-center text-sm"
        >
          <span className="text-muted-foreground">{item.name}</span>
          <span
            className={`font-semibold ${
              item.amount.startsWith("+")
                ? "text-green-600"
                : item.amount.startsWith("-")
                ? "text-red-600"
                : "text-foreground"
            }`}
          >
            {item.amount}
          </span>
        </div>
      ))}

      {stat.isGrowth && (
        <div className="mt-3 h-2 bg-primary/10 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 w-[60%]" />
        </div>
      )}
    </div>
  );
}
