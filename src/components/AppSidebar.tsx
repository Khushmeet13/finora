import { Home, Receipt, Target, Sparkles, TrendingUp, User, Search, Bell, FileText } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Transactions", url: "/transactions", icon: Receipt },
  { title: "Budgets", url: "/budgets", icon: Target },
  { title: "AI Recommendations", url: "/recommendations", icon: Sparkles },
];

const secondaryItems = [
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Search Products", url: "/search", icon: Search },
  { title: "Insights", url: "/insights", icon: TrendingUp },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-sidebar-accent text-sidebar-primary font-medium"
      : "hover:bg-sidebar-accent/50 ";

  return (
    <Sidebar className={`${collapsed ? "w-22" : "w-64"} bg-slate-900 text-slate-100`} collapsible="icon">
      <SidebarContent>
        <div className="px-2 py-6 ">
          <div className="flex items-center gap-2">
            {!collapsed && (
              <>
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
                    FinOra
                  </h2>

                  <p className="text-xs text-sidebar-foreground/60">Smart Money Manager</p>
                </div>
              </>
            )}
            {collapsed && (
              <div className="h-8 w-8 p-2 rounded-lg bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center mx-auto">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className="hover:text-primary">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>More</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className="hover:text-primary">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}