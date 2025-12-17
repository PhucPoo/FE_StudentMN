import { getCurrentUser } from "@/service/authService";
import { getStudentByUserId } from "@/service/studentService";
import { useEffect, useState } from "react";
import { Avatar, Dropdown, Menu, notification } from "antd";
import { SettingOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  avatarUrl?: string;
}

export function Header({ avatarUrl }: HeaderProps) {
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getCurrentUser();
        if (user.role === "Student") {
          const student = await getStudentByUserId(user.id);
          user.avt = student.data.data.avt;
        }
        setCurrentUser(user);
      } catch (err) {
        console.error("Không lấy được user", err);
      }
    }
    fetchUser();
  }, []);

    const items = [
    {
      key: "update",
      label: "Cập nhật thông tin",
      icon: <SettingOutlined />,
    },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const handleMenuClick = (e: any) => {
    if (e.key === "update") navigate("/profile");
    if (e.key === "logout") {
      localStorage.removeItem("token");
      navigate("/");
       notification.success({
        title: "Thành công",
        description: "Đăng xuất thành công!",
        placement: "topRight",
      });

    }
  };

  const avatarToShow = avatarUrl || currentUser?.avt;

  return (
     <header className="sticky top-0 z-30 flex h-16 items-center justify-end gap-4 border-b border-border bg-card px-6">
      <Dropdown
        menu={{ items, onClick: handleMenuClick }}
        placement="bottomRight"
        arrow
      >
        {avatarToShow ? (
          <Avatar
            src={avatarToShow}
            size={40}
            className="cursor-pointer"
          />
        ) : (
          <Avatar
            size={40}
            icon={<UserOutlined />}
            className="cursor-pointer bg-orange-500"
          />
        )}
      </Dropdown>
    </header>
  );
}
