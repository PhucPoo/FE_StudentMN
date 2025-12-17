import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { notification } from "antd";
import { updateUsers } from "@/service/accountService";

interface UpdateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
  userData: any;
}

export default function UpdateAccountModal({
  isOpen,
  onClose,
  onUpdateSuccess,
  userData,
}: UpdateAccountModalProps) {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    roleId: "",
    password: "",
    isActive: true,
  });

  
  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || "",
        fullName: userData.fullName || "",
        email: userData.email || "",
        roleId: userData.roleId ,
        isActive: userData.isActive ?? true,
        password: "",
      });
    }
  }, [userData, isOpen]);

  const handleSubmit = async () => {
    try {
      await updateUsers(userData.id, {
        username: formData.username,
        roleId: formData.roleId,
        isActive: formData.isActive,
        fullName: formData.fullName,
        email: formData.email,
        password: "",
      });
      notification.success({
        title: "Thành công",
        description: "Cập nhật tài khoản thành công!",
        placement: "topRight",
      });
      onClose();
      onUpdateSuccess();
    } catch (error) {
      notification.success({
        title: "Lỗi",
        description: "Cập nhật tài khoản thất bại!",
        placement: "topRight",
      });
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Chỉnh sửa tài khoản</h2>

        <div className="space-y-4">
          <Input
            placeholder="Username"
            value={formData.username}
            readOnly
            className="bg-gray-100 cursor-not-allowed"
          />
          <Input
            placeholder="Họ và tên"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            placeholder="Role ID"
            value={formData.roleId}
            readOnly
            className="bg-gray-100 cursor-not-allowed"
          />
          <Input
            placeholder="Trạng thái"
            value={formData.isActive ? "Hoạt động" : "Khoá"}
            readOnly
            className="bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="flex justify-end mt-6 gap-2">
          <Button variant="secondary" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSubmit}>Lưu</Button>
        </div>
      </div>
    </div>
  );
}
