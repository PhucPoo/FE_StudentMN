import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { notification } from "antd";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { getCurrentUser } from "@/service/authService";
import { Teacher } from "@/lib/interface";
import { getTeachers, updateTeachers } from "@/service/teacherService";

export default function ProfileTeacher() {
    const [teacher, setTeacher] = useState<Teacher | null>(null);
    const [originTeacher, setOriginTeacher] = useState<Teacher | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTeacher() {
            try {
                const currentUser = await getCurrentUser();
                const res = await getTeachers(1, 50, "");
                const found = res.data.data.find(
                    (s: Teacher) => s.userId === currentUser.id
                );

                if (!found) {
                    notification.error({
                        title: "Lỗi",
                        description: "Không tìm thấy dữ liệu giảng viên",
                    });
                    return;
                }

                setTeacher(found);
                setOriginTeacher(found);
            } catch (error) {
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

    if (loading) return <p>Loading...</p>;
    if (!teacher) return <p>Không có dữ liệu</p>;

    const handleChange = (key: keyof Teacher, value: any) => {
        setTeacher({ ...teacher, [key]: value });
    };

    const handleSave = async () => {
        try {
            await updateTeachers(teacher.id, {
                userId: teacher.userId,
                teacherCode: teacher.teacherCode,
                fullName: teacher.user.fullName,
                email: teacher.user.email,
                phoneNumber: teacher.phoneNumber,
                avt: teacher.avt,
                gender: teacher.gender,
                address: teacher.address,
            });

            notification.success({
                title: "Thành công",
                description: "Cập nhật thông tin thành công",
            });

            setOriginTeacher(teacher);
            setIsEditing(false);
        } catch (error) {
            notification.error({
                title: "Lỗi",
                description: "Cập nhật thất bại",
            });
        }
    };

    const renderRow = (
        label: string,
        value: any,
        editableKey?: keyof Teacher
    ) => (
        <>
            <div className="p-4 border-b font-medium">{label}</div>
            <div className="p-4 border-b">
                {isEditing && editableKey ? (
                    <Input
                        value={value || ""}
                        onChange={(e) =>
                            handleChange(editableKey, e.target.value)
                        }
                    />
                ) : (
                    value || "-"
                )}
            </div>
        </>
    );
    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !teacher) return;

    const previewUrl = URL.createObjectURL(file);
    setTeacher({ ...teacher, avt: previewUrl });

    try {
        await updateTeachers(teacher.id, {
            userId: teacher.userId,
            teacherCode: teacher.teacherCode,
            fullName: teacher.user.fullName,
            email: teacher.user.email,
            phoneNumber: teacher.phoneNumber || "",
            avt: previewUrl,
            gender: teacher.gender || "",
            address: teacher.address || "",
        });

        notification.success({
            title: "Thành công",
            description: "Cập nhật ảnh đại diện thành công",
        });
    } catch (error) {
        notification.error({
            title: "Lỗi",
            description: "Không thể cập nhật ảnh đại diện",
        });
    }
};



    return (
        <TeacherLayout>
            <div className="bg-white rounded-lg shadow-lg 
                w-full md:w-2/3 
                max-w-none p-6 relative">
                <Card className="w-full h-full flex flex-col">
                    <CardHeader className="flex justify-between flex-row">
                        <h2 className="text-lg font-semibold">Thông tin giảng viên</h2>

                        {!isEditing ? (
                            <Button variant="outline" onClick={() => setIsEditing(true)}>
                                Cập nhật thông tin
                            </Button>
                        ) : (
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setTeacher(originTeacher);
                                        setIsEditing(false);
                                    }}
                                >
                                    Hủy
                                </Button>
                                <Button onClick={handleSave}>Lưu</Button>
                            </div>
                        )}
                    </CardHeader>

                    <CardContent>
                        <div className="grid grid-cols-2 auto-rows-min border rounded-lg overflow-hidden">

                            {/* Avatar full 2 columns */}
                            <div className="p-6 border-b col-span-2 flex items-center gap-4">
                                <Avatar className="w-40 h-40">
                                    <AvatarImage src={teacher.avt} />
                                    <AvatarFallback>SV</AvatarFallback>
                                </Avatar>

                                <div className="flex flex-col gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => document.getElementById("avatarInput")?.click()}
                                    >
                                        Đổi ảnh
                                    </Button>

                                    <input
                                        id="avatarInput"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleAvatarChange}
                                    />
                                </div>
                            </div>

                            {renderRow("TeacherCode", teacher.teacherCode)}
                            {renderRow("FullName", teacher.user.fullName)}
                            {renderRow("Email", teacher.user.email)}
                            {renderRow("PhoneNumber", teacher.phoneNumber, "phoneNumber")}
                            {renderRow("Gender", teacher.gender)}
                            {renderRow("Address", teacher.address, "address")}
                        </div>
                    </CardContent>

                </Card>
            </div>
        </TeacherLayout>
    );
}
