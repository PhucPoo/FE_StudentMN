import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { notification } from "antd";
import { getUsers } from "@/service/accountService";

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
  addStudentApi: (data: any) => Promise<any>;
}

export default function AddStudentModal({
  isOpen,
  onClose,
  onAddSuccess,
  addStudentApi,
}: AddStudentModalProps) {
  const [formData, setFormData] = useState({
    avt: "",
    studentcode: "",
    fullName: "",
    dateOfBirth: "",
    address: "",
    gender: "",
    email: "",
    phoneNumber: "",
    userId: null,
  });
  const [users, setUsers] = useState<any[]>([]);

  const [page] = useState(1);
  const [pageSize] = useState(50);
  const [search] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await getUsers(page, pageSize, search);
    const filteredUsers = res.data.data.filter((u: any) => u.roleId === 2);
    setUsers(filteredUsers);
  };

  const handleSelectFullName = (fullName: string) => {
    const selected = users.find((u) => u.fullName === fullName);

    setFormData({
      ...formData,
      fullName,
      email: selected?.email || "",
      userId: selected?.id || null,
    });
  };

  const handleSelectEmail = (email: string) => {
    const selected = users.find((u) => u.email === email);

    setFormData({
      ...formData,
      email,
      fullName: selected?.fullName || "",
      userId: selected?.id || null,
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        dateOfBirth: formData.dateOfBirth
        ? new Date(formData.dateOfBirth).toISOString().split("T")[0]
        : null,
      };
      await addStudentApi(payload);
      notification.success({
        title: "Thành công",
        description: "Thêm tài khoản thành công!",
        placement: "topRight",
      });
      onClose();
      onAddSuccess();
      setFormData({ avt: "", studentcode: "", fullName: "", dateOfBirth: "", address: "", gender: "", email: "", phoneNumber: "", userId: null });
    } catch (error) {
      notification.error({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi thêm tài khoản!",
        placement: "topRight",
      });
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Thêm tài khoản</h2>

        <div className="space-y-4">
          <Input
            placeholder="Ảnh đại diện"
            value={formData.avt}
            onChange={(e) => setFormData({ ...formData, avt: e.target.value })}
          />
          <Input
            placeholder="Mã sinh viên"
            value={formData.studentcode}
            onChange={(e) => setFormData({ ...formData, studentcode: e.target.value })}
          />
          <select
            className="w-full p-2 border rounded"
            value={formData.fullName}
            onChange={(e) => handleSelectFullName(e.target.value)}
          >
            <option value="">-- Chọn họ và tên --</option>
            {users.map((u) => (
              <option key={u.id} value={u.fullName}>
                {u.fullName}
              </option>
            ))}
          </select>
          <Input
            placeholder="Ngày sinh"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
          />
          <Input
            placeholder="Nơi ở"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          <select
            className="w-full p-2 border rounded"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          >
            <option value="">-- Chọn giới tính --</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>

          <select
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={(e) => handleSelectEmail(e.target.value)}
          >
            <option value="">-- Chọn email --</option>
            {users.map((u) => (
              <option key={u.id} value={u.email}>
                {u.email}
              </option>
            ))}
          </select>
          <Input
            placeholder="Số điện thoại"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          />
        </div>

        <div className="flex justify-end mt-6 gap-2">
          <Button variant="secondary" onClick={onClose}>Hủy</Button>
          <Button onClick={handleSubmit}>Lưu</Button>
        </div>
      </div>
    </div>
  );
}
