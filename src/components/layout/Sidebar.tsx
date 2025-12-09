import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  LayoutDashboard,
  MessageSquare,
  Users,
  UserCircle,
  ClipboardList,
  Database,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { logout } from "@/service/authService";
import { notification } from "antd";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Trang chủ", path: "/" },
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: MessageSquare, label: "Tin nhắn", path: "/messages" },
  { icon: Users, label: "Quản lí tài khoản", path: "/admin-management" },
  { icon: UserCircle, label: "Thông tin SV", path: "/student-info" },
  { icon: ClipboardList, label: "Bảng điểm SV", path: "/grades" },
  { icon: Database, label: "Quản lý CSDL", path: "/database" },
  { icon: User, label: "Hồ sơ cá nhân", path: "/profile" },
  
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
   const navigate = useNavigate();

   const handleLogout =async () => {
    await logout(); 
    navigate("/"); 
    notification.success({
        title: "Thành công",
        description: "Đăng xuất thành công!",
        placement: "topRight",
      });

  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-sidebar-muted px-4">
        {!collapsed && (
          <h1 className="text-lg font-semibold text-sidebar-foreground">
            Student Management Web App
          </h1>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-active text-sidebar-active-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-muted"
                  )
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-sidebar-muted p-2">
        <button
        onClick={handleLogout}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-muted"
          )}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Đăng xuất</span>}
        </button>
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full bg-sidebar-active text-sidebar-active-foreground shadow-md"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>
    </aside>
  );
}
