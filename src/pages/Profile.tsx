import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, Building } from "lucide-react";

export default function Profile() {
  return (
    <MainLayout>
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-2xl font-semibold text-foreground">Hồ sơ cá nhân</h1>

        <Card className="card-shadow">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-semibold text-primary-foreground">
                NVA
              </div>
              <div>
                <h2 className="text-xl font-semibold text-card-foreground">Nguyễn Việt Anh</h2>
                <p className="text-muted-foreground">Cố vấn học tập</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="name" defaultValue="Nguyễn Việt Anh" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="email" defaultValue="vietanh@edu.vn" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="phone" defaultValue="0901234567" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Khoa</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="department" defaultValue="Công nghệ thông tin" className="pl-10" />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button>Lưu thay đổi</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
