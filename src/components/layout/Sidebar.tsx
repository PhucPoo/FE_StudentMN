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
  GraduationCap,
  Layers,
  BookOpen,
  ShieldIcon,
} from "lucide-react";
import { logout } from "@/service/authService";
import { notification } from "antd";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path?: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  {
    icon: ShieldIcon,
    label: "Quản lý quyền",
    children: [
      { icon: UserCircle, label: "Danh sách quyền", path: "/permission-list" },
      { icon: User, label: "Phân quyền", path: "/decentralization" },
    ],
  },
  { icon: GraduationCap, label: "Quản lý lớp học", path: "/class" },
  // {icon: GraduationCap, label: "Quản lý lớp học phần", path: "/courseSection" },
  // {icon: Layers, label: "Quản lý đăng kí học phần", path: "/enrollment" },
  { icon: Layers, label: "Quản lý chuyên khoa", path: "/major" },
  { icon: BookOpen, label: "Quản lý môn học", path: "/subject" },
  { icon: Users, label: "Quản lí tài khoản", path: "/account" },

  {
    icon: Users,
    label: "Quản lý người dùng",
    children: [
      { icon: UserCircle, label: "Quản lý sinh viên", path: "/student-info" },
      { icon: User, label: "Quản lý giảng viên", path: "/teacher-info" },
    ],
  },

  // { icon: ClipboardList, label: "Bảng điểm SV", path: "/grades" },
  // { icon: Database, label: "Quản lý CSDL", path: "/database" },
  { icon: User, label: "Hồ sơ cá nhân", path: "/profile" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogout = async () => {
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
          {navItems.map((item) => {
            const hasChildren = !!item.children;
            const isOpen = openMenu === item.label;

            return (
              <li key={item.label}>
                {hasChildren ? (
                  <>
                    {/* Menu cha */}
                    <button
                      onClick={() =>
                        setOpenMenu(isOpen ? null : item.label)
                      }
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-muted"
                      )}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="flex-1">{item.label}</span>
                      )}
                      {!collapsed && (
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 transition-transform",
                            isOpen && "rotate-90"
                          )}
                        />
                      )}
                    </button>

                    {/* Submenu */}
                    {isOpen && !collapsed && (
                      <ul className="mt-1 space-y-1 pl-4"> 
                        {item.children?.map((sub) => (
                          <li key={`${item.label}-${sub.label}`}>
                            <NavLink
                              to={sub.path!}
                              className={({ isActive }) =>
                                cn(
                                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                  isActive
                                    ? "bg-sidebar-active text-sidebar-active-foreground"
                                    : "text-sidebar-foreground hover:bg-sidebar-muted"
                                )
                              }
                            >
                              <sub.icon className="h-4 w-4" />
                              <span>{sub.label}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>

                    )}
                  </>
                ) : (
                  // Menu bình thường
                  <NavLink
                    to={item.path!}
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
                )}
              </li>
            );
          })}
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

      {/* Collapse button */}
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
