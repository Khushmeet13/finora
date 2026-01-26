import { ChevronsRight } from "lucide-react";

const actions = [
  "Add Expense",
  "Add Income",
  "Adjust Budget",
  "Reallocate",
  "View Transactions",
  "Download Report",
  "Smart Insights",
];

const QuickActions = () => {
  return (
    <div className="border-t border-gray-200 pt-5">
      <div className="flex items-start gap-4">
        {/* Left Arrow Indicator */}
        <div className="flex items-center text-gray-400 mt-1">
          <ChevronsRight className="h-5 w-5" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap">
          {actions.map((action, index) => (
            <button
              key={action}
              className={`
                px-4 pb-2 text-sm font-medium
                text-gray-700
                hover:text-primary
                transition-all duration-200
                border-b-2 border-transparent
                hover:border-primary
                active:scale-[0.97]
                ${
                  index !== actions.length - 1
                    ? "border-r border-gray-200 mr-4 pr-4"
                    : ""
                }
              `}
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
