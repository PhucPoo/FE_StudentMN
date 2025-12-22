import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { Table } from "@/components/ui/table";
import { Pagination, Modal, notification } from 'antd';
import { addMajors, deteleMajors, getMajors, updateMajors } from "@/service/majorService";
import AddMajor from "./AddMajor";
import UpdateMajor from "./UpdateMajor";

export default function MajorInfo() {
  const [Majors, setMajors] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalMajors, setTotalMajors] = useState(0);
  const [search, setSearch] = useState("");


  const loadMajors = async (page: number) => {
    try {
      const res = await getMajors(page, pageSize, search);

      setMajors(res.data.data);
      setTotalMajors(res.data.totalCount);
    } catch (error) {
      console.log("Lỗi load Major:", error);
    }
  };

  useEffect(() => {
    loadMajors(page);
  }, [page]);

  const handleDelete = async (Major: any) => {
    Modal.confirm({
      title: `Bạn có chắc muốn xóa ${Major.Majorname}?`,
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      onOk: async () => {
        try {
          await deteleMajors(Major.id);
          notification.success({
            title: "Thành công",
            description: `Xóa ${Major.Majorname} thành công!`,
            placement: "topRight",
          });
          loadMajors(page);
        } catch (error) {
          notification.error({
            title: "Lỗi",
            description: `Xóa ${Major.Majorname} thất bại!`,
            placement: "topRight",
          });
        }
      },
      onCancel: () => {
        notification.info({
          title: "Hủy",
          description: `Bạn đã hủy xóa ${Major.Majorname}.`,
          placement: "topRight",
        });
      },
    });
  };


  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Quản lí chuyên ngành</h1>
          <Button onClick={() => setOpenAdd(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm chuyên ngành
          </Button>
        </div>

        <Card className="card-shadow">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div className="relative w-full max-w-xs">
              <div className="relative w-full max-w-xs">
                <Input
                  placeholder="Tìm kiếm chuyên ngành..."
                  className="pl-10 h-11 rounded-xl shadow-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer"
                  onClick={() => {
                    setPage(1);
                    loadMajors(1);
                  }}
                />
              </div>

            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>MajorName</TableHead>
                  <TableHead>Desciption</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {Majors.map((m) => (
                  <TableRow key={m.id} className="hover:bg-muted/50">

                    <TableCell>{m.majorName}</TableCell>
                    <TableCell>{m.description}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedMajor(m);
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
              total={totalMajors}
              onChange={(page) => setPage(page)}
              showSizeChanger={false}
              className="mt-4"
            />

          </CardContent>
        </Card>

        <AddMajor
          isOpen={openAdd}
          onClose={() => setOpenAdd(false)}
          onAddSuccess={() => loadMajors(page)}
        />

        <UpdateMajor
          isOpen={openUpdate}
          onClose={() => setOpenUpdate(false)}
          onUpdateSuccess={() => loadMajors(page)}
          MajorData={selectedMajor}
        />
      </div>
    </MainLayout>
  );
}
