import { ChevronDown } from "lucide-react";

type Transaction = {
  id: number;
  name: string;
  date: string;
  amount: string;
  status: "Completed" | "Declined";
  isPositive: boolean;
  icon: string;
};

const transactions: Transaction[] = [
  {
    id: 1,
    name: "Dividend payout",
    date: "25 Feb 2025",
    amount: "+ $1,100",
    status: "Completed",
    isPositive: true,
    icon: "https://randomuser.me/api/portraits/women/34.jpg",
  },
  {
    id: 2,
    name: "Corporate subscriptions",
    date: "25 Feb 2025",
    amount: "- $6,400",
    status: "Declined",
    isPositive: false,
    icon: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: 3,
    name: "Investment in ETF",
    date: "21 Feb 2025",
    amount: "- $900",
    status: "Completed",
    isPositive: false,
    icon: "https://randomuser.me/api/portraits/women/13.jpg",
  },
  {
    id: 4,
    name: "Consulting services",
    date: "21 Feb 2025",
    amount: "- $2,100",
    status: "Completed",
    isPositive: false,
    icon: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    id: 5,
    name: "Equipment purchase",
    date: "20 Feb 2025",
    amount: "- $1,700",
    status: "Completed",
    isPositive: false,
    icon: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 6,
    name: "Elli Harper",
    date: "15 Feb 2025",
    amount: "+ $600",
    status: "Completed",
    isPositive: true,
    icon: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 7,
    name: "Davis Rowen",
    date: "15 Feb 2025",
    amount: "+ $800",
    status: "Completed",
    isPositive: true,
    icon: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const TransactionHistory = () => {
  return (
    <div className="w-full max-w-2xl bg-white rounded-xl p-5 shadow-sm border">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Transaction history
        </h2>

        <button className="flex items-center gap-1 text-sm border rounded-md px-3 py-1.5 text-gray-700">
          7d <ChevronDown size={14} />
        </button>
      </div>

      {/* Table Header */}
      <div className="flex justify-between text-xs text-gray-400 mb-2">
        <span>Name</span>
        <span>Amount</span>
      </div>

      {/* Transactions */}
      <div className="space-y-4">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <img
                src={tx.icon}
                alt={tx.name}
                className="w-9 h-9 rounded-full object-cover"
              />

              <div>
                <p className="text-sm font-medium text-gray-900">
                  {tx.name}
                </p>
                <p className="text-xs text-gray-400">
                  {tx.date}
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="text-right">
              <p
                className={`text-sm font-medium ${
                  tx.isPositive
                    ? "text-gray-900"
                    : "text-gray-900"
                }`}
              >
                {tx.amount}
              </p>
              <p
                className={`text-xs ${
                  tx.status === "Completed"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {tx.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
