import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react";
import { Table } from "@/components/ui/table";
import { Pagination, Modal, notification } from 'antd';
import { addPermissions, detelePermissions, getPermissions, updatePermissions } from "@/service/permissionService";
import AddPermission from "./AddPermission";
import UpdatePermission from "./UpdatePermission";


export default function PermissionList() {
  const [permissions, setPermissions] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalPermissions, setTotalPermissions] = useState(0);
  const [search, setSearch] = useState("");


  const loadPermissions = async (page: number) => {
    try {
      const res = await getPermissions();

      setPermissions(res.data.data);
      setTotalPermissions(res.data.totalCount);
    } catch (error) {
      console.log("Lỗi load Permission:", error);
    }
  };

  useEffect(() => {
    loadPermissions(page);
  }, [page]);

  const handleDelete = async (permission: any) => {
    Modal.confirm({
      title: `Bạn có chắc muốn xóa ${permission.permissionname}?`,
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      onOk: async () => {
        try {
          await detelePermissions(permission.id);
          notification.success({
            title: "Thành công",
            description: `Xóa ${permission.permissionname} thành công!`,
            placement: "topRight",
          });
          loadPermissions(page);
        } catch (error) {
          notification.error({
            title: "Lỗi",
            description: `Xóa ${permission.permissionname} thất bại!`,
            placement: "topRight",
          });
        }
      },
      onCancel: () => {
        notification.info({
          title: "Hủy",
          description: `Bạn đã hủy xóa ${permission.permissionname}.`,
          placement: "topRight",
        });
      },
    });
  };


  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Quản lí quyền</h1>
          <Button onClick={() => setOpenAdd(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm quyền
          </Button>
        </div>

        <Card className="card-shadow">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div className="relative w-full max-w-xs">
              <div className="relative w-full max-w-xs">
                <Input
                  placeholder="Tìm kiếm quyền..."
                  className="pl-10 h-11 rounded-xl shadow-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer"
                  onClick={() => {
                    setPage(1);
                    loadPermissions(1);
                  }}
                />
              </div>

            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PermissionName</TableHead>
                  <TableHead>Desciption</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {permissions.map((q) => (
                  <TableRow key={q.id} className="hover:bg-muted/50">
                    <TableCell>{q.permissionName}</TableCell>
                    <TableCell>{q.description}</TableCell>
                    
                    <TableCell className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedPermission(q);
                          setOpenUpdate(true);
                        }}
                        title="Chỉnh sửa"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(q)}
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
              total={totalPermissions}
              onChange={(page) => setPage(page)}
              showSizeChanger={false}
              className="mt-4"
            />

          </CardContent>
        </Card>

        <AddPermission
          isOpen={openAdd}
          onClose={() => setOpenAdd(false)}
          onAddSuccess={() => loadPermissions(page)}
        />

        <UpdatePermission
          isOpen={openUpdate}
          onClose={() => setOpenUpdate(false)}
          onUpdateSuccess={() => loadPermissions(page)}
          permissionData={selectedPermission}
        />
        
      </div>
    </MainLayout>
  );
}
