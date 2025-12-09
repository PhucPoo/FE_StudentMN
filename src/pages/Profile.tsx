import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getStudentByUserId, updateStudents } from "@/service/studentService";
import { getCurrentUser } from "@/service/authService";
import { notification } from "antd";
export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  studentCode: string;
  phoneNumber: string;
  department?: string;
  role: string;
  avt?: string;
  gender?: string;
  address?: string;
}

export default function Profile() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getCurrentUser();
        if (!user) throw new Error("Không tìm thấy user");

        // Nếu là sinh viên thì lấy thêm dữ liệu
        if (user.role === "Student") {
          const student = await getStudentByUserId(user.id);
          user.avt = student.data.data.avt;
          user.studentCode = student.data.data.studentCode;
          user.phoneNumber = student.data.data.phoneNumber;
          user.gender = student.data.data.gender;
          user.address = student.data.data.address;
        }

        setCurrentUser(user);
        setFormData(user); 
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!currentUser || !formData) return <p>Không thể lấy thông tin người dùng</p>;

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev!,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (currentUser.role === "Student") {
        const payload = {
          studentCode: formData.studentCode,
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          avt: formData.avt,
          gender:formData.gender,
          address:formData.address,
        };
        
         await updateStudents(currentUser.id, payload);
      }

      setCurrentUser(formData);
      setIsEditing(false);
      notification.success({
        title: "Thành công",
        description: "Cập nhật thông tin thành công!",
        placement: "topRight",
      });
    } catch (err) {
      console.error(err);
      notification.error({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi cập nhật thông tin tài khoản!",
        placement: "topRight",
      });
    }
  };

  const renderAvatar = () => {
    if (currentUser.role === "Admin") {
      return (
        <div className="h-full w-full flex items-center justify-center bg-orange-500 text-white text-3xl font-bold">
          AD
        </div>
      );
    }
    if (currentUser.avt) {
      return <img src={currentUser.avt} alt="avatar" className="h-20 w-20 rounded-full object-cover" />;
    }
    return currentUser.fullName?.charAt(0) || "?";
  };

  return (
    <MainLayout>
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-2xl font-semibold text-foreground">Hồ sơ cá nhân</h1>

        <Card className="card-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-semibold text-primary-foreground">
                  {renderAvatar()}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-card-foreground">
                    {currentUser.fullName}
                  </h2>
                  <p className="text-muted-foreground">{currentUser.role}</p>
                </div>
              </div>

              {/* 🔥 Nút sửa thông tin */}
              {!isEditing && (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Sửa thông tin
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">

              {/* Admin */}
              {currentUser.role === "Admin" && (
                <>
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
                </>
              )}

              {/* Student */}
              {currentUser.role === "Student" && (
                <>
                  <div>
                    <Label>Mã sinh viên</Label>
                    <Input disabled value={formData.studentCode} />
                  </div>

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

                  <div>
                    <Label>Số điện thoại</Label>
                    <Input
                      disabled={!isEditing}
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange("phoneNumber", e.target.value)}
                    />
                  </div>
                </>
              )}

              {/* Teacher */}
              {currentUser.role === "Teacher" && (
                <>
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

                  <div>
                    <Label>Khoa</Label>
                    <Input
                      disabled={!isEditing}
                      value={formData.department}
                      onChange={(e) => handleChange("department", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Số điện thoại</Label>
                    <Input
                      disabled={!isEditing}
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange("phoneNumber", e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>

            {/* ⚡ nút Cập nhật thông tin */}
            {isEditing && (
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Hủy
                </Button>
                <Button onClick={handleSave}>Cập nhật thông tin</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
