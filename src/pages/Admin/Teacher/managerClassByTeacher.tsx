import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { Table } from "@/components/ui/table";
import { Pagination, Modal, notification } from 'antd';
import { deteleClasses, getClasses } from "@/service/classService";
import { Class, Major, Teacher } from "@/lib/interface";
import { getMajors } from "@/service/majorService";
import { getTeachers } from "@/service/teacherService";
import { saveAs } from "file-saver";
import { getStudentByClass } from "@/service/studentService";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { getCurrentUser } from "@/service/authService";




export default function ClassListByTeacher() {
    const [classes, setClasses] = useState<Class[]>([]);
    const [majors, setMajors] = useState<Major[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    const [page, setPage] = useState(1);
    const [pageSize] = useState(8);
    const [totalClasss, setTotalClasss] = useState(0);
    const [search, setSearch] = useState("");


    const loadClasses = async (page: number) => {
        try {
            const currentUser = await getCurrentUser(); 
            const res = await getClasses(page, pageSize, search);
            // Lọc lớp theo teacherId
            const teacherClasses = res.data.data.filter(
                (cls) => cls.teacher.userId === currentUser.id
            );

            setClasses(teacherClasses);
            setTotalClasss(teacherClasses.length);
        } catch (error) {
            console.log("Lỗi load Class:", error);
        }
    };
    const loadMajors = async () => {
        try {
            const res = await getMajors(page, pageSize, search);
            setMajors(res.data.data);
        } catch (error) {
            console.log("Lỗi load majors", error);
        }
    };
    const handleExportExcel = async (classId: number) => {
        try {
            const res = await getStudentByClass(classId, { responseType: 'blob' });

            const blob = new Blob([res.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            });

            saveAs(blob, `Danh_sach_sinh_vien_lop_${classId}.xlsx`);
        } catch (error) {
            console.error("Lỗi xuất Excel:", error);
        }
    };

    // Load Teachers
    const loadTeachers = async () => {
        try {
            const res = await getTeachers(page, pageSize, search);
            setTeachers(res.data.data);
        } catch (error) {
            console.log("Lỗi load teachers", error);
        }
    };

    useEffect(() => {
        loadClasses(page);
        loadMajors()
        loadTeachers();
    }, [page]);




    return (
        <TeacherLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-foreground">Quản lí lớp học</h1>
                </div>

                <Card className="card-shadow">
                    <CardHeader className="flex flex-row items-center justify-between gap-4">
                        <div className="relative w-full max-w-xs">
                            <div className="relative w-full max-w-xs">
                                <Input
                                    placeholder="Tìm kiếm lớp học..."
                                    className="pl-10 h-11 rounded-xl shadow-sm"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Search
                                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer"
                                    onClick={() => {
                                        setPage(1);
                                        loadClasses(1);
                                    }}
                                />
                            </div>

                        </div>
                    </CardHeader>

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ClassName</TableHead>
                                    <TableHead>CourseYear</TableHead>
                                    <TableHead>Teacher</TableHead>
                                    <TableHead>Major</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {classes.map((cls) => (
                                    <TableRow key={cls.id} className="hover:bg-muted/50">

                                        <TableCell>{cls.className}</TableCell>
                                        <TableCell>{cls.courseYear}</TableCell>
                                        <TableCell>{cls.teacher.user.fullName}</TableCell>
                                        <TableCell>{cls.major.majorName}</TableCell>
                                        <TableCell className="flex gap-2">
                                            {/* <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(cls)}
                                                title="Xóa"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button> */}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleExportExcel(cls.id)}
                                                title="Xuất Excel"
                                            >
                                                📄
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <Pagination
                            current={page}
                            pageSize={pageSize}
                            total={totalClasss}
                            onChange={(page) => setPage(page)}
                            showSizeChanger={false}
                            className="mt-4"
                        />

                    </CardContent>
                </Card>


            </div>
        </TeacherLayout>
    );
}
