"use client";

import { useState } from "react";
import { X } from "lucide-react"; // assuming lucide-react is installed, or use heroicons/svg

type Alert = {
  id: string;
  type: "warning" | "danger" | "success" | "info";
  title: string;
  message: string;
  details?: string;
  timestamp: string;
};

const Alerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "a1",
      type: "warning",
      title: "Travel category nearing limit",
      message: "92% of budget already used this month",
      details: "Current spend: ₹4,600 / ₹5,000\nRemaining: ₹400\nAverage daily spend last 7 days: ₹657\nProjected overspend if trend continues: ₹1,271 by month-end",
      timestamp: "2 hours ago",
    },
    {
      id: "a2",
      type: "danger",
      title: "Overall budget at risk",
      message: "Only ₹3,200 buffer remains for next 3 days",
      details: "Daily safe limit: ₹1,067\nRecommended action: Reduce discretionary spending\nCritical categories: Travel, Shopping",
      timestamp: "30 min ago",
    },
    {
      id: "a3",
      type: "success",
      title: "Positive savings trend",
      message: "You're ₹1,450 ahead compared to last month",
      details: "Current savings rate: 18%\nLast month: 11%\nMost improved category: Food (-₹1,400 vs last month)",
      timestamp: "Yesterday",
    },
  ]);

  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const getStyles = (type: Alert["type"]) => {
    const map = {
      danger:  {   border: "border-rose-200",   text: "text-rose-800", dot: "bg-rose-500"   },
      warning: {   border: "border-amber-200",  text: "text-amber-800", dot: "bg-amber-500"  },
      success: {border: "border-emerald-200",text: "text-emerald-800",dot: "bg-emerald-500"},
      info:    {   border: "border-blue-200",   text: "text-blue-800",  dot: "bg-blue-500"   },
    };
    return map[type] || map.info;
  };

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 shadow-md">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800 text-lg tracking-tight">Alerts</h3>
        </div>

        {alerts.length === 0 ? (
          <div className="px-6 py-10 text-center text-gray-500 text-sm">
            No active alerts at the moment.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {alerts.map((alert) => {
              const style = getStyles(alert.type);

              return (
                <div
                  key={alert.id}
                  className={`p-4 border-l-4 ${style.border} relative group`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 mt-1.5 rounded-full ${style.dot}`} />

                    <div className="flex-1">
                      <p className={`font-medium text-[14.5px] ${style.text}`}>
                        {alert.title}
                      </p>
                      <p className="mt-0.5 text-sm text-gray-700 leading-relaxed">
                        {alert.message}
                      </p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                        <span>{alert.timestamp}</span>
                        <button
                          onClick={() => setSelectedAlert(alert)}
                          className="text-gray-600 hover:text-gray-900 font-medium hover:underline"
                        >
                          View details
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className="text-gray-400 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-gray-100"
                      aria-label="Dismiss alert"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h4 className="font-medium text-gray-900 text-lg">
                {selectedAlert.title}
              </h4>
              <button
                onClick={() => setSelectedAlert(null)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-gray-700 text-[15px]">
              <p className="leading-relaxed">{selectedAlert.message}</p>
              
              {selectedAlert.details && (
                <div className="bg-gray-50 rounded-lg p-4 text-sm leading-relaxed whitespace-pre-line border border-gray-200">
                  {selectedAlert.details}
                </div>
              )}

              <div className="text-xs text-gray-500 pt-2">
                Received {selectedAlert.timestamp}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedAlert(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Close
              </button>
              {/* You can add more actions here */}
              <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Take action
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alerts;