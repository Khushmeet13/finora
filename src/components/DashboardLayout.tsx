import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Bell, Sun, Moon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { useTheme } from "next-themes";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { theme, setTheme } = useTheme();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card flex items-center px-6 justify-between sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h2 className="text-xl font-bold tracking-tight">Track Expenses</h2>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">

              {/* Bell Notification */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
              </Button>

              {/* Theme Toggle Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              {/* Profile Avatar Icon */}
              <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarImage src="/profile.jpg" alt="User" />
                <AvatarFallback>KS</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
