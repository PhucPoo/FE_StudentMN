import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react";
import { Table } from "@/components/ui/table";
import { Pagination, Modal, notification } from 'antd';
import { deteleStudents, getStudentByClass, getStudents } from "@/service/studentService";
import AddStudent from "./AddStudent";
import UpdateStudent from "./UpdateStudent";
import DetailStudent from "./DetailStudent";

export default function StudentInfo() {
  const [students, setStudents] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalStudents, setTotalStudents] = useState(0);
  const [search, setSearch] = useState("");


  const loadStudents = async (page: number) => {
    try {
      const res = await getStudents(page, pageSize, search);

      setStudents(res.data.data);
      setTotalStudents(res.data.totalCount);
    } catch (error) {
      console.log("Lỗi load student:", error);
    }
  };

  useEffect(() => {
    loadStudents(page);
  }, [page]);

  const handleDelete = async (student: any) => {
    Modal.confirm({
      title: `Bạn có chắc muốn xóa ${student.studentname}?`,
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      onOk: async () => {
        try {
          await deteleStudents(student.id);
          notification.success({
            title: "Thành công",
            description: `Xóa ${student.studentname} thành công!`,
            placement: "topRight",
          });
          loadStudents(page);
        } catch (error) {
          notification.error({
            title: "Lỗi",
            description: `Xóa ${student.studentname} thất bại!`,
            placement: "topRight",
          });
        }
      },
      onCancel: () => {
        notification.info({
          title: "Hủy",
          description: `Bạn đã hủy xóa ${student.studentname}.`,
          placement: "topRight",
        });
      },
    });
  };
console.log(">>>>", students);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Quản lí sinh viên</h1>
          <Button onClick={() => setOpenAdd(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm sinh viên
          </Button>
        </div>

        <Card className="card-shadow">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div className="relative w-full max-w-xs">
              <div className="relative w-full max-w-xs">
                <Input
                  placeholder="Tìm kiếm tài khoản..."
                  className="pl-10 h-11 rounded-xl shadow-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer"
                  onClick={() => {
                    setPage(1);
                    loadStudents(1);
                  }}
                />
              </div>

            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>AVT</TableHead>
                  <TableHead>StudentCode</TableHead>
                  <TableHead>FullName</TableHead>
                  <TableHead>DateOfBirth</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>PhoneNumber</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {students.map((s) => (
                  <TableRow key={s.id} className="hover:bg-muted/50">
                    <TableCell><img
                      src={s.avt}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    /></TableCell>
                    <TableCell>{s.studentCode}</TableCell>
                    <TableCell>{s.user.fullName}</TableCell>
                    <TableCell>{s.dateOfBirth ? new Date(s.dateOfBirth).toLocaleDateString('vi-VN') : ''}</TableCell>
                    <TableCell>{s.address}</TableCell>
                    <TableCell>{s.gender}</TableCell>
                    <TableCell>{s.course}</TableCell>
                    <TableCell>{s.phoneNumber}</TableCell>
                    <TableCell>{s.class?.className || ''}</TableCell>
                    <TableCell>
                      {Boolean(s.isDelete) ? (
                        <span className="px-2 py-1 text-white bg-red-500 rounded-md text-center text-sm">
                          Đã nghỉ học
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-green-600 border border-green-600 rounded-md text-center text-sm">
                          Hoạt động
                        </span>
                      )}
                    </TableCell>

                    <TableCell className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedStudent(s);
                          setOpenUpdate(true);
                        }}
                        title="Chỉnh sửa"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedStudent(s);
                          setOpenDetail(true);
                        }}
                        title="Xem chi tiết"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(s)}
                        title="Xóa"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Pagination
              current={page}
              pageSize={pageSize}
              total={totalStudents}
              onChange={(page) => setPage(page)}
              showSizeChanger={false}
              className="mt-4"
            />

          </CardContent>
        </Card>

        <AddStudent
          isOpen={openAdd}
          onClose={() => setOpenAdd(false)}
          onAddSuccess={() => loadStudents(page)}
        />

        <UpdateStudent
          isOpen={openUpdate}
          onClose={() => setOpenUpdate(false)}
          onUpdateSuccess={() => loadStudents(page)}
          studentData={selectedStudent}
        />
        <DetailStudent
          isOpen={openDetail}
          onClose={() => setOpenDetail(false)}
          studentData={selectedStudent}
        />
      </div>
    </MainLayout>
  );
}
