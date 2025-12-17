import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { notification, Select } from "antd";
import { getUsers } from "@/service/accountService";
import { addPermissions } from "@/service/permissionService";
const { Option } = Select;

interface AddPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
}

export default function AddPermissionModal({
  isOpen,
  onClose,
  onAddSuccess,
}: AddPermissionModalProps) {
  const [formData, setFormData] = useState({
    permissionname: "",
    description: "",
  });
  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
      };
      await addPermissions(payload);
      notification.success({
        title: "Thành công",
        description: "Thêm quyền thành công!",
        placement: "topRight",
      });
      onClose();
      onAddSuccess();
      setFormData({permissionname: "", description: ""});
    } catch (error) {
      notification.error({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi thêm quyền!",
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
            placeholder="Tên quyền"
            type="text"
            value={formData.permissionname}
            onChange={(e) => setFormData({ ...formData, permissionname: e.target.value })}
          />
          <Input
            placeholder="Mô tả"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
