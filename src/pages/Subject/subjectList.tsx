import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { Table } from "@/components/ui/table";
import { Pagination, Modal, notification } from 'antd';
import AddSubject from "./AddSubject";
import UpdateSubject from "./UpdateSubject";
import { deteleSubjects, getSubjects } from "@/service/subjectService";

export default function SubjectInfo() {
  const [subjects, setSubjects] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalSubjects, setTotalSubjects] = useState(0);
  const [search, setSearch] = useState("");


  const loadSubjects = async (page: number) => {
    try {
      const res = await getSubjects(page, pageSize, search);

      setSubjects(res.data.data);
      setTotalSubjects(res.data.totalCount);
    } catch (error) {
      console.log("Lỗi load Subject:", error);
    }
  };

  useEffect(() => {
    loadSubjects(page);
  }, [page]);

  const handleDelete = async (subject: any) => {
    Modal.confirm({
      title: `Bạn có chắc muốn xóa ${subject.subjectName}?`,
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      onOk: async () => {
        try {
          await deteleSubjects(subject.id);
          notification.success({
            title: "Thành công",
            description: `Xóa ${subject.subjectName} thành công!`,
            placement: "topRight",
          });
          loadSubjects(page);
        } catch (error) {
          notification.error({
            title: "Lỗi",
            description: `Xóa ${subject.subjectName} thất bại!`,
            placement: "topRight",
          });
        }
      },
      onCancel: () => {
        notification.info({
          title: "Hủy",
          description: `Bạn đã hủy xóa ${subject.subjectName}.`,
          placement: "topRight",
        });
      },
    });
  };


  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Quản lí môn học</h1>
          <Button onClick={() => setOpenAdd(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm môn học
          </Button>
        </div>

        <Card className="card-shadow">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div className="relative w-full max-w-xs">
              <div className="relative w-full max-w-xs">
                <Input
                  placeholder="Tìm kiếm môn học..."
                  className="pl-10 h-11 rounded-xl shadow-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer"
                  onClick={() => {
                    setPage(1);
                    loadSubjects(1);
                  }}
                />
              </div>

            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SubjectName</TableHead>
                  <TableHead>SubjectCode</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Major</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {subjects.map((m) => (
                  <TableRow key={m.id} className="hover:bg-muted/50">

                    <TableCell>{m.subjectName}</TableCell>
                    <TableCell>{m.subjectCode}</TableCell>
                    <TableCell>{m.credits}</TableCell>
                    <TableCell>{m.major?.majorName || ''}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedSubject(m);
                          setOpenUpdate(true);
                        }}
                        title="Chỉnh sửa"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(m)}
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
              total={totalSubjects}
              onChange={(page) => setPage(page)}
              showSizeChanger={false}
              className="mt-4"
            />

          </CardContent>
        </Card>

        <AddSubject
          isOpen={openAdd}
          onClose={() => setOpenAdd(false)}
          onAddSuccess={() => loadSubjects(page)}
        />

        <UpdateSubject
          isOpen={openUpdate}
          onClose={() => setOpenUpdate(false)}
          onUpdateSuccess={() => loadSubjects(page)}
          subjectData={selectedSubject}
        />
      </div>
    </MainLayout>
  );
}
