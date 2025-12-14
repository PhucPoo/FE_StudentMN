import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdminProfile {
  fullName: string;
  email: string;
  role: string;
}

export default function ProfileAdmin({ user }: { user: AdminProfile }) {
  const [formData, setFormData] = useState(user);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <MainLayout>
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-2xl font-semibold">Hồ sơ Admin</h1>

        <Card>
          <CardHeader className="flex justify-between flex-row">
            <div>
              <h2 className="text-xl font-semibold">{formData.fullName}</h2>
              <p className="text-muted-foreground">{formData.role}</p>
            </div>

            {!isEditing && (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Sửa thông tin
              </Button>
            )}
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <Label>Họ và tên</Label>
              <Input
                disabled={!isEditing}
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                disabled={!isEditing}
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            {isEditing && (
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Hủy
                </Button>
                <Button>Lưu</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
