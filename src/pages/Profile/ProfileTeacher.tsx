import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCurrentUser } from "@/service/authService";
import { notification } from "antd";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { Teacher } from "@/lib/interface";
import { getTeachers, updateTeachers } from "@/service/teacherService";

export default function ProfileTeacher() {
    const [formData, setFormData] = useState<Teacher | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [page] = useState(1);
    const [pageSize] = useState(50);
    const [search] = useState("");

    useEffect(() => {
        async function fetchTeacher() {
            try {
                setLoading(true);

                const currentUser = await getCurrentUser();

                const teachersRes = await getTeachers(page, pageSize, search);

                const teacher = teachersRes.data.data.find(s => s.userId === currentUser.id);

                if (!teacher) {
                    notification.error({
                        title: "Lỗi",
                        description: "Không tìm thấy dữ liệu giảng viên",
                    });
                    return;
                }

                setFormData(teacher);

            } catch (error) {
                console.error(error);
                notification.error({
                    title: "Lỗi",
                    description: "Không thể lấy dữ liệu giảng viên",
                });
            } finally {
                setLoading(false);
            }

        }

        fetchTeacher();
    }, []);

    if (loading) return <p>Loading Teacher...</p>;
    if (!formData) return <p>Không tìm thấy dữ liệu giảng viên</p>;

    const handleChange = (key: keyof Teacher, value: any) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSave = async () => {
        try {
            await updateTeachers(formData.id, {
                userId: formData.userId,
                teacherCode: formData.teacherCode,
                fullName: formData.user.fullName,
                email: formData.user.email,
                phoneNumber: formData.phoneNumber,
                avt: formData.avt,
                gender: formData.gender,
                address: formData.address,
            });

            notification.success({
                title: "Thành công",
                description: "Cập nhật thông tin giảng viên thành công",
            });
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            notification.error({
                title: "Lỗi",
                description: "Không thể cập nhật thông tin",
            });
        }
    };

    return (
        <TeacherLayout>
            <div className="space-y-6 max-w-2xl">
                <h1 className="text-2xl font-semibold">Hồ sơ giảng viên</h1>

                <Card>
                    <CardHeader className="flex justify-between flex-row">
                        <div>
                            <h2 className="text-xl font-semibold">
                                {formData.user?.fullName || ""}
                            </h2>
                            <p className="text-muted-foreground">Teacher</p>
                        </div>

                        {!isEditing && (
                            <Button variant="outline" onClick={() => setIsEditing(true)}>
                                Sửa thông tin
                            </Button>
                        )}
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div>
                            <Label>Mã giảng viên</Label>
                            <Input disabled value={formData.teacherCode || ""} />
                        </div>

                        <div>
                            <Label>Họ và tên</Label>
                            <Input
                                disabled={!isEditing}
                                value={formData.user?.fullName || ""}
                                onChange={(e) =>
                                    handleChange("user", {
                                        ...formData.user,
                                        fullName: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div>
                            <Label>Email</Label>
                            <Input disabled value={formData.user?.email || ""} />
                        </div>

                        <div>
                            <Label>Số điện thoại</Label>
                            <Input
                                disabled={!isEditing}
                                value={formData.phoneNumber || ""}
                                onChange={(e) =>
                                    handleChange("phoneNumber", e.target.value)
                                }
                            />
                        </div>

                        {isEditing && (
                            <div className="flex justify-end gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setFormData({ ...formData }); // reset form
                                        setIsEditing(false);
                                    }}
                                >
                                    Hủy
                                </Button>
                                <Button onClick={handleSave}>Cập nhật</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </TeacherLayout>
    );
}
