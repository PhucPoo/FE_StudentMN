import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react";
import { Table } from "@/components/ui/table";
import { Pagination, Modal, notification } from 'antd';
import { addTeachers, deteleTeachers, getTeachers, updateTeachers } from "@/service/teacherService";
import AddTeacher from "./AddTeacher";
import UpdateTeacher from "./UpdateTeacher";
import { getMajors } from "@/service/majorService";
import { set } from "date-fns";
import DetailTeacher from "./DetailTeacher";

export default function TeacherInfo() {
  const [Teachers, setTeachers] = useState([]);
  const [majors, setMajors] = useState<any[]>([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [search, setSearch] = useState("");


  const loadTeachers = async (page: number) => {
    try {
      const res = await getTeachers(page, pageSize, search);
      const resMajors = await getMajors(page, pageSize, search);

      setMajors(resMajors.data.data);
      setTeachers(res.data.data);
      setTotalTeachers(res.data.totalCount);
    } catch (error) {
      console.log("Lỗi load Teacher:", error);
    }
  };

  useEffect(() => {
    loadTeachers(page);
  }, [page]);

  const handleDelete = async (teacher: any) => {
    Modal.confirm({
      title: `Bạn có chắc muốn xóa ${teacher.teachername}?`,
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      onOk: async () => {
        try {
          await deteleTeachers(teacher.id);
          notification.success({
            title: "Thành công",
            description: `Xóa ${teacher.teachername} thành công!`,
            placement: "topRight",
          });
          loadTeachers(page);
        } catch (error) {
          notification.error({
            title: "Lỗi",
            description: `Xóa ${teacher.teachername} thất bại!`,
            placement: "topRight",
          });
        }
      },
      onCancel: () => {
        notification.info({
          title: "Hủy",
          description: `Bạn đã hủy xóa ${teacher.teachername}.`,
          placement: "topRight",
        });
      },
    });
  };

  const getRoleName = (roleId: number) => {
    switch (roleId) {
      case 1: return "Admin";
      case 2: return "Sinh viên";
      case 3: return "Giảng viên";
      default: return "Khác";
    }
  };
  console.log(majors);
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Quản lí giảng viên</h1>
          <Button onClick={() => setOpenAdd(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm giảng viên
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
                    loadTeachers(1);
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
                  <TableHead>TeacherCode</TableHead>
                  <TableHead>FullName</TableHead>
                  <TableHead>DateOfBirth</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>PhoneNumber</TableHead>
                  <TableHead>Chuyên ngành</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {Teachers.map((t) => (
                  <TableRow key={t.id} className="hover:bg-muted/50">
                    <TableCell><img
                      src={t.avt}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}

                    /></TableCell>
                    <TableCell>{t.teacherCode}</TableCell>
                    <TableCell>{t.fullName}</TableCell>
                    <TableCell>{t.dateOfBirth ? new Date(t.dateOfBirth).toLocaleDateString('vi-VN') : ''}</TableCell>
                    <TableCell>{t.address}</TableCell>
                    <TableCell>{t.gender}</TableCell>
                    <TableCell>{t.email}</TableCell>
                    <TableCell>{t.phoneNumber}</TableCell>
                    <TableCell>{majors.find((m) => m.id === t.majorId)?.majorName || ""}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedTeacher(t);
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
                          setSelectedTeacher(t);
                          setOpenDetail(true);
                        }}
                        title="Xem chi tiết"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(t)}
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
              total={totalTeachers}
              onChange={(page) => setPage(page)}
              showSizeChanger={false}
              className="mt-4"
            />

          </CardContent>
        </Card>

        <AddTeacher
          isOpen={openAdd}
          onClose={() => setOpenAdd(false)}
          onAddSuccess={() => loadTeachers(page)}
          addTeacherApi={addTeachers}
        />

        <UpdateTeacher
          isOpen={openUpdate}
          onClose={() => setOpenUpdate(false)}
          onUpdateSuccess={() => loadTeachers(page)}
          updateTeacherApi={updateTeachers}
          teacherData={selectedTeacher}
        />
        <DetailTeacher
          isOpen={openDetail}
          onClose={() => setOpenDetail(false)}
          teacherData={selectedTeacher}
        />
      </div>
    </MainLayout>
  );
}
