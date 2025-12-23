import { StudentLayout } from "@/components/layout/StudentLayout";
import { Student } from "@/lib/interface";
import { getCurrentUser } from "@/service/authService";
import { getStudentById, getStudents } from "@/service/studentService";
import { notification } from "antd";
import { useEffect, useState } from "react";

export default function DashboardStudent() {
    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);
    const [page] = useState(1);
    const [pageSize] = useState(50);
    const [search] = useState("");

    useEffect(() => {
        async function fetchStudent() {
            try {
                setLoading(true);

                const currentUser = await getCurrentUser();

                const studentsRes = await getStudents(page, pageSize, search);

                const student = studentsRes.data.data.find(s => s.userId === currentUser.id);

                if (!student) {
                    notification.error({
                        title: "Lỗi",
                        description: "Không tìm thấy dữ liệu sinh viên",
                    });
                    return;
                }

                setStudent(student);

            } catch (error) {
                console.error(error);
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

    if (loading) return <p>Đang tải dữ liệu...</p>;

    return (
        <StudentLayout>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">
                    Chào mừng {student?.user.fullName || "Sinh viên"} trở lại!
                </h1>
                {/* <p className="text-gray-600">
                    Đây là dashboard của bạn. Từ đây bạn có thể xem bảng điểm, hồ sơ cá nhân và các thông tin khác.
                </p> */}
            </div>
        </StudentLayout>
    );
}