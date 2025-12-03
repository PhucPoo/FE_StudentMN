import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, MessageSquare, TrendingUp } from "lucide-react";

const stats = [
  { title: "Tổng sinh viên", value: "156", icon: Users, color: "text-info" },
  { title: "Lớp học", value: "4", icon: BookOpen, color: "text-success" },
  { title: "Tin nhắn mới", value: "12", icon: MessageSquare, color: "text-warning" },
  { title: "Điểm TB lớp", value: "7.8", icon: TrendingUp, color: "text-purple" },
];

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="card-shadow animate-fade-in">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Đã cập nhật điểm cho lớp CACLC4", time: "2 giờ trước" },
                { action: "Nhận tin nhắn từ Trần Văn B", time: "5 giờ trước" },
                { action: "Đã thêm sinh viên mới vào hệ thống", time: "1 ngày trước" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                  <span className="text-sm text-card-foreground">{item.action}</span>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
