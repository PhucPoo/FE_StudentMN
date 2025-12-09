import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, Building } from "lucide-react";
import axios from "axios";
import { getUsers } from "@/service/accountService";
import { get } from "http";
import { getStudentByUserId, getStudents } from "@/service/studentService";
import { getCurrentUser } from "@/service/authService";

interface UserProfile {
  userId: number;
  fullName: string;
  email: string;
  studentCode: string;
  phoneNumber: string;
  department?: string;
  role: string;
  avt?: string;
}

export default function Profile() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [page] = useState(1);
  const [pageSize] = useState(50);
  const [search] = useState("");


   useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getCurrentUser();
        if (!user) throw new Error("Không tìm thấy user");

        // Nếu là sinh viên, lấy avatar
        if (user.role === "Student") {
          try {
            const student = await getStudentByUserId(user.id);
            console.log(">>>>>>>>",student);
            
            user.avt = student.data.data.avt;
            user.studentCode = student.data.data.studentCode;
            user.phoneNumber = student.data.data.phoneNumber;
          } catch (err) {
            console.error("Không lấy được avatar sinh viên", err);
          }
        }

        setCurrentUser(user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!currentUser) return <p>Không thể lấy thông tin người dùng</p>;

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
    if (currentUser.fullName) {
      return currentUser.fullName
        .split(" ")
        .map((n) => n[0])
        .join("");
    }
    return "?";
  };

  return (
    <MainLayout>
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-2xl font-semibold text-foreground">Hồ sơ cá nhân</h1>

        <Card className="card-shadow">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-semibold text-primary-foreground">
                {renderAvatar()}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-card-foreground">{currentUser.fullName}</h2>
                <p className="text-muted-foreground">{currentUser.role}</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Admin */}
              {currentUser.role === "Admin" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên</Label>
                    <Input id="name" defaultValue={currentUser.fullName} className="pl-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue={currentUser.email} className="pl-10" />
                  </div>
                </>
              )}

              {/* Sinh viên */}
              {currentUser.role === "Student" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="studentCode">Mã sinh viên</Label>
                    <Input id="studentCode" defaultValue={currentUser.studentCode} className="pl-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên</Label>
                    <Input id="name" defaultValue={currentUser.fullName} className="pl-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue={currentUser.email} className="pl-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" defaultValue={currentUser.phoneNumber} className="pl-10" />
                  </div>
                </>
              )}

              {/* Giáo viên */}
              {currentUser.role === "Teacher" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên</Label>
                    <Input id="name" defaultValue={currentUser.fullName} className="pl-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue={currentUser.email} className="pl-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Khoa</Label>
                    <Input id="department" defaultValue={currentUser.department} className="pl-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" defaultValue={currentUser.phoneNumber} className="pl-10" />
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end">
              <Button>Cập nhật thông tin</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
