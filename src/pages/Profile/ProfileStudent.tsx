import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { notification } from "antd";
import { StudentLayout } from "@/components/layout/StudentLayout";
import { getCurrentUser } from "@/service/authService";
import { getStudents, updateStudents } from "@/service/studentService";
import { Student } from "@/lib/interface";

export default function ProfileStudent() {
    const [student, setStudent] = useState<Student | null>(null);
    const [originStudent, setOriginStudent] = useState<Student | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStudent() {
            try {
                const currentUser = await getCurrentUser();
                const res = await getStudents(1, 50, "");
                const found = res.data.data.find(
                    (s: Student) => s.userId === currentUser.id
                );

                if (!found) {
                    notification.error({
                        title: "Lỗi",
                        description: "Không tìm thấy dữ liệu sinh viên",
                    });
                    return;
                }

                setStudent(found);
                setOriginStudent(found);
            } catch (error) {
                notification.error({
                    title: "Lỗi",
                    description: "Không thể lấy dữ liệu sinh viên",
                });
            } finally {
                setLoading(false);
            }
        }

        fetchStudent();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!student) return <p>Không có dữ liệu</p>;

    const handleChange = (key: keyof Student, value: any) => {
        setStudent({ ...student, [key]: value });
    };

    const handleSave = async () => {
        try {
            await updateStudents(student.id, {
                userId: student.userId,
                studentCode: student.studentCode,
                fullName: student.user.fullName,
                email: student.user.email,
                phoneNumber: student.phoneNumber,
                avt: student.avt,
                gender: student.gender,
                address: student.address,
            });

            notification.success({
                title: "Thành công",
                description: "Cập nhật thông tin thành công",
            });

            setOriginStudent(student);
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
        editableKey?: keyof Student
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
    if (!file || !student) return;

    const previewUrl = URL.createObjectURL(file);
    setStudent({ ...student, avt: previewUrl });

    try {
        await updateStudents(student.id, {
            userId: student.userId,
            studentCode: student.studentCode,
            fullName: student.user.fullName,
            email: student.user.email,
            phoneNumber: student.phoneNumber || "",
            avt: previewUrl,
            gender: student.gender || "",
            address: student.address || "",
            course: student.course || ""
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
        <StudentLayout>
            <div className="bg-white rounded-lg shadow-lg 
                w-full md:w-2/3 
                max-w-none p-6 relative">
                <Card className="w-full h-full flex flex-col">
                    <CardHeader className="flex justify-between flex-row">
                        <h2 className="text-lg font-semibold">Thông tin sinh viên</h2>

                        {!isEditing ? (
                            <Button variant="outline" onClick={() => setIsEditing(true)}>
                                Cập nhật thông tin
                            </Button>
                        ) : (
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setStudent(originStudent);
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
                                    <AvatarImage src={student.avt} />
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

                            {renderRow("StudentCode", student.studentCode)}
                            {renderRow("FullName", student.user.fullName)}
                            {renderRow("Email", student.user.email)}
                            {renderRow("PhoneNumber", student.phoneNumber, "phoneNumber")}
                            {renderRow("Gender", student.gender)}
                            {renderRow("Address", student.address, "address")}
                        </div>
                    </CardContent>

                </Card>
            </div>
        </StudentLayout>
    );
}
