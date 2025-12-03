import { MainLayout } from "@/components/layout/MainLayout";
import { UserInfoCard } from "@/components/dashboard/UserInfoCard";
import { ActionCard } from "@/components/dashboard/ActionCard";
import { FeatureCard } from "@/components/dashboard/FeatureCard";
import {
  LayoutGrid,
  LogOut,
  Info,
  Bell,
  MessageCircle,
  CheckSquare,
  ClipboardList,
  Database,
} from "lucide-react";

const Index = () => {
  return (
    <MainLayout>
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Welcome Message */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground">
            Chào mừng đến với Ứng dụng Quản lý Sinh viên - Cố vấn học tập!
          </h1>
        </div>

        {/* User Info & Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2">
          <UserInfoCard
            name="Nguyễn Việt Anh"
            role="Cố vấn học tập"
            currentClass="CACLC4"
          />
          <div className="grid grid-cols-2 gap-4">
            <ActionCard
              icon={LayoutGrid}
              title="Đổi lớp"
              iconColor="info"
            />
            <ActionCard
              icon={LogOut}
              title="Đăng xuất"
              iconColor="danger"
            />
          </div>
        </div>

        {/* Contact Utilities */}
        <section>
          <h2 className="mb-4 text-lg font-medium text-foreground">
            Tiện ích liên lạc
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <FeatureCard
              icon={Info}
              title="Thông tin liên hệ"
              iconColor="info"
            />
            <FeatureCard
              icon={Bell}
              title="Quản lí tài khoản"
              iconColor="warning"
            />
            <FeatureCard
              icon={MessageCircle}
              title="Nhắn tin"
              iconColor="success"
            />
          </div>
        </section>

        {/* Tracking & Statistics */}
        <section>
          <h2 className="mb-4 text-lg font-medium text-foreground">
            Tiện ích theo dõi & thống kê
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <FeatureCard
              icon={CheckSquare}
              title="Bảng theo dõi"
              iconColor="success"
            />
            <FeatureCard
              icon={ClipboardList}
              title="Bảng điểm"
              iconColor="warning"
            />
            <FeatureCard
              icon={Database}
              title="Quản lý CSDL"
              iconColor="primary"
            />
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
