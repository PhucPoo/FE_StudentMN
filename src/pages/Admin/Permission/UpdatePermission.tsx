import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { notification } from "antd";
import { permission } from "process";
import { updatePermissions } from "@/service/permissionService";

interface UpdatePermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
  permissionData: any;
}

export default function UpdatePermissionModal({
  isOpen,
  onClose,
  onUpdateSuccess,
  permissionData,
}: UpdatePermissionModalProps) {
  const [formData, setFormData] = useState({
    permissionname: "",
    description: "",
  });

  useEffect(() => {
    if (permissionData) {
      setFormData({
        permissionname: permissionData.permissionname || "",
        description: permissionData.description || "",
      });
    }
  }, [permissionData, isOpen]);

  const handleSubmit = async () => {
    try {
      const payload = {
        permissionname: formData.permissionname,
        description: formData.description,
      };

      await updatePermissions(permissionData.id, payload);

      notification.success({
        title: "Thành công",
        description: "Cập nhật quyền thành công!",
        placement: "topRight",
      });
      onClose();
      onUpdateSuccess();
    } catch (error) {
      notification.error({
        title: "Lỗi",
        description: "Cập nhật quyền thất bại!",
        placement: "topRight",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Chỉnh sửa quyền</h2>

        <div className="space-y-4">
         
          <Input
            placeholder="Tên quyền"
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
          <Button variant="secondary" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSubmit}>Lưu</Button>
        </div>
      </div>
    </div>
  );
}
