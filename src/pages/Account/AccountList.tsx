import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { Table } from "@/components/ui/table";
import { addUsers, deleteUsers, getUsers, updateUsers } from "@/service/accountService";
import AddAccount from "./AddAccount";
import UpdateAccount from "./UpdateAccount";
import { Pagination, Modal, notification } from 'antd';

export default function AccountList() {
  const [users, setUsers] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalUsers, setTotalUsers] = useState(0);


  const loadUsers = async (page:number) => {
    try {
      const res = await getUsers(page, pageSize);

      setUsers(res.data.data);
      setTotalUsers(res.data.totalCount);
    } catch (error) {
      console.log("Lỗi load user:", error);
    }
  };

  useEffect(() => {
    loadUsers(page);
  }, [page]);

  const handleDelete = async (user: any) => {
     Modal.confirm({
    title: `Bạn có chắc muốn xóa ${user.username}?`,
    okText: "Xóa",
    cancelText: "Hủy",
    okType: "danger",
    onOk: async () => {
      try {
      await deleteUsers(user.id);
       notification.success({
          title: "Thành công",
          description: `Xóa ${user.username} thành công!`,
          placement: "topRight",
        });
      loadUsers(page);
    } catch (error) {
        notification.error({
          title: "Lỗi",
          description: `Xóa ${user.username} thất bại!`,
          placement: "topRight",
        });
      }
    },
    onCancel: () => {
      notification.info({
        title: "Hủy",
        description: `Bạn đã hủy xóa ${user.username}.`,
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

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Quản lí tài khoản</h1>
          <Button onClick={() => setOpenAdd(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm tài khoản
          </Button>
        </div>

        {/* SEARCH + TABLE */}
        <Card className="card-shadow">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm tài khoản..."
                className="pl-10 h-11 rounded-xl shadow-sm"
              />
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Fullname</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Permission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id} className="hover:bg-muted/50">
                    <TableCell>{u.username}</TableCell>
                    <TableCell>{u.fullName}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{getRoleName(u.roleId)}</TableCell>
                    <TableCell>{u.isActive ? "Hoạt động" : "Khoá"}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedUser(u);
                          setOpenUpdate(true);
                        }}
                        title="Chỉnh sửa"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(u)}
                        title="Xóa"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* PAGINATION */}
            <Pagination
              current={page}
              pageSize={pageSize}
              total={totalUsers}
              onChange={(page) => setPage(page)}
              showSizeChanger={false} 
              className="mt-4"
            />
          </CardContent>
        </Card>

        {/* ADD ACCOUNT MODAL */}
        <AddAccount
          isOpen={openAdd}
          onClose={() => setOpenAdd(false)}
          onAddSuccess={()=>loadUsers(page)}
          addAccountApi={addUsers}
        />

        {/* UPDATE ACCOUNT MODAL */}
        <UpdateAccount
          isOpen={openUpdate}
          onClose={() => setOpenUpdate(false)}
          onUpdateSuccess={()=>loadUsers( page)}
          updateAccountApi={updateUsers}
          userData={selectedUser}
        />
      </div>
    </MainLayout>
  );
}
