import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import {
  Plus,
  Download,
  Bell,
  Calendar,
  Link2,
  FileText,
  Wallet,
  Settings,
} from "lucide-react";

const actions = [
  {
    label: "Add Income",
    icon: Plus,
    desc: "New source",
  },
  {
    label: "Download Report",
    icon: Download,
    desc: "PDF / CSV",
  },
  {
    label: "Set Reminder",
    icon: Bell,
    desc: "Bills & salary",
  },
  {
    label: "Pay Cycle",
    icon: Calendar,
    desc: "Monthly view",
  },
];

const links = [
  {
    label: "All Transactions",
    icon: FileText,
  },
  {
    label: "Manage Wallets",
    icon: Wallet,
  },
  {
    label: "Financial Settings",
    icon: Settings,
  },
];

const QuickActions = () => {
  return (
    <Card className="border border-border/60 bg-background/80 backdrop-blur rounded-xl shadow-md transition-all duration-300">
      
      {/* Header */}
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold tracking-tight">
          Quick Actions
          <p className="text-sm text-muted-foreground font-normal mt-1">
            Manage income & finances faster
          </p>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">

        {/* 🔹 Actions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {actions.map((item, i) => (
            <button
              key={i}
              className="
                group relative
                flex flex-col items-center justify-center gap-3
                rounded-lg p-5
                bg-muted/50 border border-border/60
                hover:bg-primary/5 hover:border-primary/30 hover:shadow-md
                transition-all duration-300
              "
            >
              <div className="
                flex h-10 w-10 items-center justify-center
                rounded-lg bg-primary/10 text-primary
                group-hover:scale-110 group-hover:bg-primary/15
                transition
              ">
                <item.icon className="h-5 w-5" />
              </div>

              <div className="text-center">
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>

              <span className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-primary/0 group-hover:ring-primary/20 transition" />
            </button>
          ))}
        </div>

        {/* 🔹 Divider */}
        <div className="h-px bg-border/60" />

        {/* 🔹 Important Links */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Link2 className="h-4 w-4 text-primary" />
            <p className="text-sm font-semibold">Important Links</p>
          </div>

          <div className="grid gap-2">
            {links.map((link, i) => (
              <button
                key={i}
                className="
                  flex items-center gap-3
                  rounded-lg px-4 py-3
                  bg-muted/40 border border-border/60
                  hover:bg-primary/5 hover:border-primary/30
                  transition
                "
              >
                <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <link.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">{link.label}</span>
              </button>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default QuickActions;
