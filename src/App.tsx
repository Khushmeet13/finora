import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Recommendations from "./pages/Recommendations";
import Reports from "./pages/Reports";
import Insights from "./pages/Insights";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import IncomeDetails from "./pages/IncomeDetails";
import ExpenseDetails from "./pages/ExpenseDetails";
import BudgetDetails from "./pages/BudgetDetails";
import TransactionsDetails from "./pages/TransactionDetails";
import { Navigate } from "react-router-dom";
import FinoraAuthPage from "./pages/FinoraAuthPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
           <Route path="/login" element={<FinoraAuthPage />} />

          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/transactions" element={<DashboardLayout><Transactions /></DashboardLayout>} />
          <Route path="/budgets" element={<DashboardLayout><Budgets /></DashboardLayout>} />
          <Route path="/recommendations" element={<DashboardLayout><Recommendations /></DashboardLayout>} />
          <Route path="/reports" element={<DashboardLayout><Reports /></DashboardLayout>} />
          <Route path="/insights" element={<DashboardLayout><Insights /></DashboardLayout>} />
          <Route path="/search" element={<DashboardLayout><Search /></DashboardLayout>} />
          <Route path="/profile" element={<DashboardLayout><Profile /></DashboardLayout>} />

          <Route path="/insights/income" element={<DashboardLayout><IncomeDetails /></DashboardLayout>} />
          <Route path="/insights/expense" element={<DashboardLayout><ExpenseDetails /></DashboardLayout>} />
          <Route path="/insights/budget" element={<DashboardLayout><BudgetDetails /></DashboardLayout>} />
          <Route path="/insights/transactions" element={<DashboardLayout><TransactionsDetails /></DashboardLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
