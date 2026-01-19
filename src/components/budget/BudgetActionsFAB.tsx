import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, RotateCcw, Copy, X } from "lucide-react";
import { useState } from "react";

export default function BudgetActionsFAB() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: <Plus size={20} />,
      label: "Add New Category",
      color: "bg-emerald-500 hover:bg-emerald-600",
      onClick: () => alert("Open Add New Category Form"),
    },
    {
      icon: <Pencil size={20} />,
      label: "Edit Current Budget",
      color: "bg-blue-500 hover:bg-blue-600",
      onClick: () => alert("Open Edit Budget Modal"),
    },
    {
      icon: <RotateCcw size={20} />,
      label: "Reset for New Month",
      color: "bg-amber-500 hover:bg-amber-600",
      onClick: () => {
        if (window.confirm("Reset all categories for new month?")) {
          alert("Budget reset initiated");
        }
      },
    },
    {
      icon: <Copy size={20} />,
      label: "Copy Last Month's Budget",
      color: "bg-violet-500 hover:bg-violet-600",
      onClick: () => alert("Copying previous month structure..."),
    },
  ];

  return (
    <>
      {/* Floating Action Button - bottom right corner */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`
            flex items-center justify-center w-16 h-16 rounded-full 
            bg-indigo-600 text-white shadow-2xl
            hover:bg-indigo-700 transition-colors
          `}
          aria-label="Budget actions"
        >
          <motion.div
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Plus size={28} />
          </motion.div>
        </motion.button>
      </div>

      {/* Right-side Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Right Side Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="
                fixed top-0 right-0 bottom-0 z-50
                w-full max-w-sm bg-white shadow-2xl
                overflow-y-auto
              "
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold">Budget Controls</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X size={22} className="text-gray-600" />
                  </button>
                </div>

                {/* Action Buttons - Vertical Stack */}
                <div className="space-y-4">
                  {actions.map((action, index) => (
                    <motion.button
                      key={action.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08, duration: 0.4 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        action.onClick();
                        setIsOpen(false);
                      }}
                      className={`
                        flex items-center gap-4 w-full p-5 rounded-2xl text-white font-medium
                        shadow-md transition-all active:opacity-90
                        ${action.color}
                      `}
                    >
                      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                        {action.icon}
                      </div>
                      <span className="text-left text-base">
                        {action.label}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Small footer note */}
                <p className="text-xs text-gray-500 text-center mt-10">
                  All changes apply to the current month only
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}