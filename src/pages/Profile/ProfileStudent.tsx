import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateStudents } from "@/service/studentService";
import { notification } from "antd";
import { StudentLayout } from "@/components/layout/StudentLayout";

interface StudentProfile {
    id: number;
    fullName: string;
    email: string;
    studentCode: string;
    phoneNumber: string;
    avt?: string;
    gender?: string;
    address?: string;
    role: string;
}

export default function ProfileStudent({ user }: { user: StudentProfile }) {
    const [formData, setFormData] = useState(user);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSave = async () => {
        try {
            await updateStudents(user.id, {
                userId: user.id,
                studentcode: formData.studentCode,
                fullName: formData.fullName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                avt: formData.avt,
                gender: formData.gender,
                address: formData.address,
            });

            notification.success({
                title: "Thành công",
                description: "Cập nhật thông tin sinh viên thành công",
            });

            setIsEditing(false);
        } catch {
            notification.error({
                title: "Lỗi",
                description: "Không thể cập nhật thông tin",
            });
        }
    };

    return (
        <StudentLayout>
            <div className="space-y-6 max-w-2xl">
                <h1 className="text-2xl font-semibold">Hồ sơ Sinh viên</h1>

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

                        {isEditing && (
                            <div className="flex justify-end gap-3">
                                <Button variant="outline" onClick={() => setIsEditing(false)}>
                                    Hủy
                                </Button>
                                <Button onClick={handleSave}>Cập nhật</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </StudentLayout>
    );
}
