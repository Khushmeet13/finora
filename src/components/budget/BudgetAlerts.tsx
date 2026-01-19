import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Bell, BellOff, X } from "lucide-react";
import { useState } from "react";

type Alert = {
  id: string;
  type: "warning" | "danger" | "info";
  title: string;
  message: string;
  category?: string;
  amount?: number;
  timestamp: string;
};

export default function BudgetAlerts() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dismissed, setDismissed] = useState<string[]>([]);

  // Sample real-time smart alerts (in real app → come from backend / state)
  const alerts: Alert[] = [
    {
      id: "a1",
      type: "warning",
      title: "Food & Dining almost finished",
      message: "90% of monthly budget already used",
      category: "Food & Dining",
      amount: 5400,
      timestamp: "2 hours ago",
    },
    {
      id: "a2",
      type: "danger",
      title: "Entertainment budget exceeded",
      message: "₹180 over the ₹1,500 limit",
      category: "Entertainment",
      amount: 1680,
      timestamp: "Yesterday",
    },
    {
      id: "a3",
      type: "warning",
      title: "Shopping getting tight",
      message: "82% spent — ₹2,460 used out of ₹3,000",
      category: "Shopping",
      amount: 2460,
      timestamp: "Today",
    },
    {
      id: "a4",
      type: "info",
      title: "Rent is due soon",
      message: "Payment scheduled in 5 days",
      timestamp: "3 days ago",
    },
  ];

  const activeAlerts = alerts.filter(a => !dismissed.includes(a.id));

  const getAlertStyle = (type: Alert["type"]) => {
    switch (type) {
      case "danger":
        return {
          bg: "bg-red-50 border-red-200",
          text: "text-red-700",
          icon: <AlertTriangle className="text-red-600" size={20} />,
        };
      case "warning":
        return {
          bg: "bg-amber-50 border-amber-200",
          text: "text-amber-800",
          icon: <AlertTriangle className="text-amber-600" size={20} />,
        };
      default:
        return {
          bg: "bg-blue-50 border-blue-200",
          text: "text-blue-700",
          icon: <Bell className="text-blue-600" size={20} />,
        };
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          Smart Alerts & Warnings
          <span className="text-sm font-normal text-gray-500">
            ({activeAlerts.length} active)
          </span>
        </h2>

        {/* Notification Toggle */}
        <button
          onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
            ${notificationsEnabled 
              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"}
          `}
        >
          {notificationsEnabled ? (
            <>
              <Bell size={16} />
              Notifications ON
            </>
          ) : (
            <>
              <BellOff size={16} />
              Notifications OFF
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {activeAlerts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center text-gray-500"
          >
            <Bell size={32} className="mx-auto mb-3 opacity-60" />
            <p className="font-medium">All good!</p>
            <p className="text-sm mt-1">No active warnings right now</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {activeAlerts.map((alert) => {
              const style = getAlertStyle(alert.type);

              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`
                    flex items-start gap-4 p-4 rounded-xl border
                    ${style.bg} ${style.text}
                  `}
                >
                  <div className="mt-0.5">{style.icon}</div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold">{alert.title}</h3>
                        <p className="text-sm mt-0.5 opacity-90">{alert.message}</p>
                      </div>

                      <button
                        onClick={() => setDismissed(prev => [...prev, alert.id])}
                        className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-black/5 transition-colors"
                        aria-label="Dismiss alert"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="mt-2 flex items-center gap-4 text-xs opacity-75">
                      <span>{alert.timestamp}</span>
                      {alert.category && (
                        <span className="bg-white/60 px-2 py-0.5 rounded-full">
                          {alert.category}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Small helpful tip */}
      {notificationsEnabled && activeAlerts.length > 0 && (
        <p className="text-xs text-gray-500 mt-4 text-center">
          You'll receive push notifications for critical budget events when enabled
        </p>
      )}
    </div>
  );
}