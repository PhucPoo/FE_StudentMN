import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { Teacher } from "@/lib/interface";
import { getCurrentUser } from "@/service/authService";
import { getTeachers } from "@/service/teacherService";
import { notification } from "antd";
import { useEffect, useState } from "react";

export default function DashboardTeacher() {
    const [teacher, setTeacher] = useState<Teacher | null>(null);
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

                setTeacher(teacher);

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

    if (loading) return <p>Đang tải dữ liệu...</p>;

    return (
        <TeacherLayout>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">
                    Chào mừng {teacher?.user.fullName || "Giảng viên"} trở lại!
                </h1>
                {/* <p className="text-gray-600">
                    Đây là dashboard của bạn. Từ đây bạn có thể xem bảng điểm, hồ sơ cá nhân và các thông tin khác.
                </p> */}
            </div>
        </TeacherLayout>
    );
}