import { AlertTriangle, Clock } from "lucide-react";

interface UpcomingTx {
  title: string;
  amount: number;
  dueIn: string;
}

const upcomingTransactions: UpcomingTx[] = [
  { title: "Netflix subscription", amount: 29, dueIn: "Tomorrow" },
  { title: "Rent payment", amount: 1200, dueIn: "3 days" },
  { title: "Credit card bill", amount: 540, dueIn: "5 days" },
];

export const UpcomingTransactions = () => {
  return (
    <div className="relative bg-white rounded-xl p-4 px-5 shadow-sm border">
      
      {/* Left alert accent */}
      <div className="absolute left-0 top-0 h-full w-1 rounded-l-3xl bg-primary" />

      {/* Header */}
      <div className="flex items-center justify-between mb-2 border-b pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <AlertTriangle size={16} className="text-gray-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Attention needed
            </h3>
            <p className="text-xs text-muted-foreground">
              Upcoming & risky payments
            </p>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="space-y-0">
        {upcomingTransactions.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl p-1 transition hover:bg-slate-50"
          >
            <div className="">
              <p className="text-sm font-medium text-gray-900">
                {item.title}
              </p>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock size={12} />
                <span>Due in {item.dueIn}</span>

                {/* Badge */}
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700">
                  Pending
                </span>
              </div>
            </div>

            <p className="text-sm font-semibold text-gray-900">
              ${item.amount.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
